// ===========================================
// Authentication Controller
// ===========================================
// Thin HTTP handlers for authentication endpoints.
// All business logic is delegated to auth.service.js.
//
// WHY THIN CONTROLLERS:
// - Single responsibility (HTTP handling only)
// - Business logic is testable in isolation
// - Easy to add new transports (GraphQL, etc.)

import * as authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Extracts request metadata for token storage.
 * Used for session tracking and security auditing.
 */
const getRequestMetadata = (req) => ({
  userAgent: req.headers["user-agent"] || null,
  ipAddress: req.ip || req.connection?.remoteAddress || null,
});

/**
 * POST /api/v1/auth/signup
 * Creates a new user account.
 */
export const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const metadata = getRequestMetadata(req);

  const result = await authService.signup({ email, password, name }, metadata);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

/**
 * POST /api/v1/auth/login
 * Authenticates user and returns tokens.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const metadata = getRequestMetadata(req);

  const result = await authService.login({ email, password }, metadata);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

/**
 * POST /api/v1/auth/refresh
 * Exchanges refresh token for new token pair.
 */
export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const metadata = getRequestMetadata(req);

  const result = await authService.refreshTokens(refreshToken, metadata);

  res.status(200).json({
    success: true,
    message: "Tokens refreshed successfully",
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

/**
 * POST /api/v1/auth/logout
 * Invalidates the provided refresh token.
 */
export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  await authService.logout(refreshToken);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/**
 * POST /api/v1/auth/logout-all
 * Invalidates all refresh tokens for the current user.
 * Requires authentication.
 */
export const logoutAll = asyncHandler(async (req, res) => {
  const sessionsRevoked = await authService.logoutAll(req.user.id);

  res.status(200).json({
    success: true,
    message: `Logged out from ${sessionsRevoked} session(s)`,
    data: {
      sessionsRevoked,
    },
  });
});

/**
 * GET /api/v1/auth/sessions
 * Returns list of active sessions for current user.
 */
export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await authService.getSessions(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      sessions,
      count: sessions.length,
    },
  });
});
