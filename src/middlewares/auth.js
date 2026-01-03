// ===========================================
// Authentication Middleware
// ===========================================
// Verifies JWT access tokens and attaches user to request.
//
// WHY MIDDLEWARE:
// - Reusable across all protected routes
// - Separates auth concern from business logic
// - Single point of token verification

import * as tokenService from "../services/token.service.js";
import prisma from "../lib/prisma.js";
import { UnauthorizedError } from "../utils/errors.js";

/**
 * Extracts JWT token from Authorization header.
 * Supports "Bearer <token>" format.
 *
 * @param {Request} req - Express request
 * @returns {string|null} Token or null
 */
const extractToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  // Check for Bearer scheme
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};

/**
 * Authentication middleware.
 * Verifies JWT and attaches user to req.user.
 *
 * USAGE:
 * router.get('/protected', authenticate, controller.method);
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw new UnauthorizedError("No authentication token provided");
    }

    // Verify token and get payload
    const payload = tokenService.verifyAccessToken(token);

    // Optionally: Fetch fresh user data from DB
    // This ensures we have latest role/plan info
    // Trade-off: Extra DB query vs stale token data
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Account has been deactivated");
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware.
 * Attaches user if token present, but doesn't fail if missing.
 * Useful for public endpoints that behave differently for logged-in users.
 *
 * USAGE:
 * router.get('/public', optionalAuth, controller.method);
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      req.user = null;
      return next();
    }

    const payload = tokenService.verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        isActive: true,
      },
    });

    req.user = user?.isActive ? user : null;

    next();
  } catch (error) {
    // Token invalid/expired - treat as unauthenticated
    req.user = null;
    next();
  }
};

export default authenticate;
