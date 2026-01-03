// ===========================================
// Plan Limits Middleware
// ===========================================
// Enforces feature limits based on user's subscription plan.
// Prevents actions that exceed plan quotas.
//
// WHY MIDDLEWARE:
// - Centralized limit enforcement
// - Consistent error messages
// - Easy to adjust limits without code changes

import prisma from "../lib/prisma.js";
import { getPlanLimits, isLimitExceeded, hasFeature } from "../config/plans.js";
import { ForbiddenError, BadRequestError } from "../utils/errors.js";

/**
 * Checks if user has exceeded a numeric limit.
 *
 * USAGE:
 * router.post('/countdowns',
 *   authenticate,
 *   checkLimit('maxActiveCountdowns'),
 *   controller.create
 * );
 *
 * @param {string} limitKey - Key from PLAN_LIMITS to check
 * @returns {Function} Express middleware
 */
export const checkLimit = (limitKey) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ForbiddenError("Authentication required");
      }

      // Get user's usage stats
      const stats = await prisma.usageStats.findUnique({
        where: { userId: req.user.id },
      });

      if (!stats) {
        // This shouldn't happen - stats created with user
        throw new BadRequestError("Usage stats not found");
      }

      // Map limit keys to usage stat fields
      const limitToStatField = {
        maxActiveCountdowns: "activeCountdowns",
        monthlyViews: "monthlyViews",
      };

      const statField = limitToStatField[limitKey];

      if (!statField) {
        // Unknown limit - let it through (fail open for unknown limits)
        return next();
      }

      const currentValue = stats[statField] || 0;

      if (isLimitExceeded(req.user.plan, limitKey, currentValue)) {
        const limits = getPlanLimits(req.user.plan);
        throw new ForbiddenError(
          `You have reached your ${req.user.plan} plan limit of ${
            limits[limitKey]
          } ${limitKey
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()
            .trim()}. Please upgrade your plan.`
        );
      }

      // Attach stats to request for later use
      req.usageStats = stats;

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Checks if user has access to a boolean feature.
 *
 * USAGE:
 * router.put('/countdowns/:id/branding',
 *   authenticate,
 *   requireFeature('removeBranding'),
 *   controller.updateBranding
 * );
 *
 * @param {string} featureKey - Feature key from PLAN_LIMITS
 * @returns {Function} Express middleware
 */
export const requireFeature = (featureKey) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ForbiddenError("Authentication required");
    }

    if (!hasFeature(req.user.plan, featureKey)) {
      throw new ForbiddenError(
        `The ${featureKey
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .trim()} feature is not available on the ${
          req.user.plan
        } plan. Please upgrade.`
      );
    }

    next();
  };
};

/**
 * Checks if user can perform a view (for countdown renders).
 * Increments view counter if allowed.
 *
 * WHY SEPARATE MIDDLEWARE:
 * - Views are high-frequency operations
 * - Need atomic increment to prevent race conditions
 * - Different error handling (don't block, just track)
 *
 * @param {string} userId - User ID who owns the countdown
 * @returns {Promise<boolean>} Whether view was counted
 */
export const checkAndIncrementViews = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, usageStats: true },
  });

  if (!user || !user.usageStats) {
    return false;
  }

  const limits = getPlanLimits(user.plan);

  // Check if within limit
  if (
    isLimitExceeded(user.plan, "monthlyViews", user.usageStats.monthlyViews)
  ) {
    return false;
  }

  // Increment views atomically
  await prisma.usageStats.update({
    where: { userId },
    data: {
      monthlyViews: { increment: 1 },
      totalViews: { increment: 1 },
    },
  });

  return true;
};

/**
 * Middleware to attach plan limits to request.
 * Useful for endpoints that need to show limits to user.
 */
export const attachPlanLimits = (req, res, next) => {
  if (req.user) {
    req.planLimits = getPlanLimits(req.user.plan);
  }
  next();
};

export default {
  checkLimit,
  requireFeature,
  checkAndIncrementViews,
  attachPlanLimits,
};
