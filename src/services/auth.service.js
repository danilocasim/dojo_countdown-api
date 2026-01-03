// ===========================================
// Authentication Service
// ===========================================
// Business logic for all authentication operations.
// Controllers should be thin - all logic lives here.
//
// WHY SERVICE LAYER:
// - Separates business logic from HTTP handling
// - Reusable across different interfaces (API, CLI, etc.)
// - Easier to test in isolation
// - Single responsibility principle

import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import config from "../config/index.js";
import * as tokenService from "./token.service.js";
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from "../utils/errors.js";

/**
 * Creates a new user account.
 * Handles email uniqueness, password hashing, and initial setup.
 *
 * @param {Object} data - User registration data
 * @param {string} data.email - User email
 * @param {string} data.password - Plain text password
 * @param {string} [data.name] - User name
 * @param {Object} metadata - Request metadata for token
 * @returns {Promise<Object>} Created user and tokens
 */
export const signup = async (data, metadata = {}) => {
  const { email, password, name } = data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new ConflictError("An account with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // Calculate initial billing period (30 days from now)
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

  // Create user with usage stats in a transaction
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || null,
      usageStats: {
        create: {
          currentPeriodEnd,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      plan: true,
      isActive: true,
      createdAt: true,
    },
  });

  // Generate tokens
  const accessToken = tokenService.generateAccessToken(user);
  const refreshToken = await tokenService.generateRefreshToken(user, metadata);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/**
 * Authenticates a user with email and password.
 *
 * WHY GENERIC ERROR MESSAGE:
 * - Prevents user enumeration attacks
 * - Attacker can't determine if email exists
 *
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {Object} metadata - Request metadata for token
 * @returns {Promise<Object>} User and tokens
 */
export const login = async (credentials, metadata = {}) => {
  const { email, password } = credentials;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  // User not found - use timing-safe comparison anyway
  if (!user) {
    // Perform dummy hash comparison to prevent timing attacks
    await bcrypt.compare(password, "$2b$12$dummyhashtopreventtimingattacks");
    throw new UnauthorizedError("Invalid email or password");
  }

  // Check if account is active
  if (!user.isActive) {
    throw new UnauthorizedError("Account has been deactivated");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Build user response (exclude password)
  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    plan: user.plan,
  };

  // Generate tokens
  const accessToken = tokenService.generateAccessToken(userResponse);
  const refreshToken = await tokenService.generateRefreshToken(
    userResponse,
    metadata
  );

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};

/**
 * Refreshes access token using a valid refresh token.
 * Implements token rotation for security.
 *
 * @param {string} refreshToken - Current refresh token
 * @param {Object} metadata - Request metadata for new token
 * @returns {Promise<Object>} New token pair
 */
export const refreshTokens = async (refreshToken, metadata = {}) => {
  // Verify and get stored token with user
  const storedToken = await tokenService.verifyRefreshToken(refreshToken);

  const user = {
    id: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
    plan: storedToken.user.plan,
  };

  // Generate new access token
  const newAccessToken = tokenService.generateAccessToken(user);

  // Rotate refresh token (delete old, create new)
  const newRefreshToken = await tokenService.rotateRefreshToken(
    storedToken.token,
    user,
    metadata
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Logs out user by invalidating refresh token.
 *
 * @param {string} refreshToken - Token to invalidate
 * @returns {Promise<boolean>} Success status
 */
export const logout = async (refreshToken) => {
  try {
    // Decode token to get tokenId (even if expired)
    const decoded = tokenService.verifyAccessToken(refreshToken).catch(() => {
      // Try to decode without verification for logout
      const parts = refreshToken.split(".");
      if (parts.length === 3) {
        return JSON.parse(Buffer.from(parts[1], "base64").toString());
      }
      return null;
    });

    // Actually verify and revoke the refresh token
    const storedToken = await tokenService.verifyRefreshToken(refreshToken);
    await tokenService.revokeRefreshToken(storedToken.token);

    return true;
  } catch (error) {
    // Even if token is invalid/expired, logout should succeed
    // This prevents logout failures from blocking UX
    return true;
  }
};

/**
 * Logs out user from all sessions.
 *
 * @param {string} userId - User ID
 * @returns {Promise<number>} Number of sessions terminated
 */
export const logoutAll = async (userId) => {
  return tokenService.revokeAllUserTokens(userId);
};

/**
 * Changes user password.
 *
 * @param {string} userId - User ID
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Current password is incorrect");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(
    newPassword,
    config.bcrypt.saltRounds
  );

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  // Optionally: Invalidate all refresh tokens to force re-login
  // await tokenService.revokeAllUserTokens(userId);

  return true;
};

/**
 * Gets the current user's active sessions.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of active sessions
 */
export const getSessions = async (userId) => {
  return tokenService.getUserSessions(userId);
};
