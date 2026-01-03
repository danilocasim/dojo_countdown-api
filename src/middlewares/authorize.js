// ===========================================
// Authorization Middleware
// ===========================================
// Role-based access control for protected routes.
//
// WHY SEPARATE FROM AUTH:
// - Authentication: "Who are you?"
// - Authorization: "What can you do?"
// - Different concerns, different middleware

import { ForbiddenError } from "../utils/errors.js";

/**
 * Creates middleware that checks if user has required role(s).
 * Must be used AFTER authenticate middleware.
 *
 * USAGE:
 * router.get('/admin', authenticate, authorize('ADMIN'), controller.method);
 * router.get('/users', authenticate, authorize('USER', 'ADMIN'), controller.method);
 *
 * @param {...string} allowedRoles - Roles that can access the route
 * @returns {Function} Express middleware
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure authenticate middleware ran first
    if (!req.user) {
      throw new ForbiddenError("Authentication required");
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError(
        `Access denied. Required role: ${allowedRoles.join(" or ")}`
      );
    }

    next();
  };
};

/**
 * Middleware that requires admin role.
 * Convenience wrapper around authorize('ADMIN').
 */
export const requireAdmin = authorize("ADMIN");

/**
 * Middleware that allows both users and admins.
 * Convenience wrapper for common case.
 */
export const requireUser = authorize("USER", "ADMIN");

export default authorize;
