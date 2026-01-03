// ===========================================
// Token Service
// ===========================================
// Handles all JWT token operations: generation, verification, and management.
//
// WHY SEPARATE SERVICE:
// - Single responsibility for token logic
// - Easy to swap JWT library if needed
// - Centralized token configuration
// - Testable in isolation

import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";
import prisma from "../lib/prisma.js";
import { UnauthorizedError } from "../utils/errors.js";

/**
 * Generates an access token for a user.
 * Short-lived token for API authentication.
 *
 * @param {Object} user - User object
 * @returns {string} JWT access token
 */
export const generateAccessToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    plan: user.plan,
  };

  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

/**
 * Generates a refresh token and stores it in the database.
 * Long-lived token for obtaining new access tokens.
 *
 * WHY STORE IN DB:
 * - Enables token revocation (logout)
 * - Supports "logout everywhere" feature
 * - Detects token reuse (theft detection)
 * - Audit trail of sessions
 *
 * @param {Object} user - User object
 * @param {Object} metadata - Request metadata (userAgent, ipAddress)
 * @returns {Promise<string>} JWT refresh token
 */
export const generateRefreshToken = async (user, metadata = {}) => {
  // Generate unique token ID
  const tokenId = crypto.randomBytes(32).toString("hex");

  // Calculate expiration date
  const expiresAt = new Date();
  const daysToAdd = parseInt(config.jwt.refreshExpiresIn) || 7;
  expiresAt.setDate(expiresAt.getDate() + daysToAdd);

  // Store token in database
  await prisma.refreshToken.create({
    data: {
      token: tokenId,
      userId: user.id,
      userAgent: metadata.userAgent || null,
      ipAddress: metadata.ipAddress || null,
      expiresAt,
    },
  });

  // Create JWT containing token ID
  const payload = {
    sub: user.id,
    tokenId,
  };

  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

/**
 * Verifies an access token.
 *
 * @param {string} token - JWT access token
 * @returns {Object} Decoded token payload
 * @throws {UnauthorizedError} If token is invalid or expired
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.accessSecret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Access token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new UnauthorizedError("Invalid access token");
    }
    throw error;
  }
};

/**
 * Verifies a refresh token and returns the stored token record.
 * Implements token rotation for security.
 *
 * WHY TOKEN ROTATION:
 * - If a refresh token is stolen, the thief gets one use
 * - When legitimate user tries to refresh, token is gone
 * - Triggers investigation/forced re-login
 *
 * @param {string} token - JWT refresh token
 * @returns {Promise<Object>} Token record with user data
 * @throws {UnauthorizedError} If token is invalid, expired, or reused
 */
export const verifyRefreshToken = async (token) => {
  let decoded;

  try {
    decoded = jwt.verify(token, config.jwt.refreshSecret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Refresh token has expired");
    }
    throw new UnauthorizedError("Invalid refresh token");
  }

  // Find token in database
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: decoded.tokenId },
    include: { user: true },
  });

  // Token not found - possible reuse attack
  if (!storedToken) {
    // Optional: Invalidate all tokens for this user (security measure)
    // await prisma.refreshToken.deleteMany({ where: { userId: decoded.sub } });
    throw new UnauthorizedError("Refresh token not found or already used");
  }

  // Check if token is expired in DB
  if (new Date() > storedToken.expiresAt) {
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
    throw new UnauthorizedError("Refresh token has expired");
  }

  // Check if user is still active
  if (!storedToken.user.isActive) {
    throw new UnauthorizedError("User account is deactivated");
  }

  return storedToken;
};

/**
 * Rotates a refresh token - deletes old, creates new.
 * Called after successful token verification.
 *
 * @param {string} oldTokenId - ID of token to invalidate
 * @param {Object} user - User object
 * @param {Object} metadata - Request metadata
 * @returns {Promise<string>} New refresh token
 */
export const rotateRefreshToken = async (oldTokenId, user, metadata = {}) => {
  // Delete old token
  await prisma.refreshToken.delete({
    where: { token: oldTokenId },
  });

  // Generate new token
  return generateRefreshToken(user, metadata);
};

/**
 * Revokes a specific refresh token (logout single session).
 *
 * @param {string} tokenId - Token ID to revoke
 * @returns {Promise<boolean>} True if token was revoked
 */
export const revokeRefreshToken = async (tokenId) => {
  try {
    await prisma.refreshToken.delete({
      where: { token: tokenId },
    });
    return true;
  } catch (error) {
    // Token might already be deleted
    return false;
  }
};

/**
 * Revokes all refresh tokens for a user (logout everywhere).
 *
 * @param {string} userId - User ID
 * @returns {Promise<number>} Number of tokens revoked
 */
export const revokeAllUserTokens = async (userId) => {
  const result = await prisma.refreshToken.deleteMany({
    where: { userId },
  });
  return result.count;
};

/**
 * Cleans up expired refresh tokens from database.
 * Should be run periodically (cron job).
 *
 * @returns {Promise<number>} Number of tokens deleted
 */
export const cleanupExpiredTokens = async () => {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
  return result.count;
};

/**
 * Gets all active sessions for a user.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of active sessions
 */
export const getUserSessions = async (userId) => {
  return prisma.refreshToken.findMany({
    where: {
      userId,
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      userAgent: true,
      ipAddress: true,
      createdAt: true,
      expiresAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
