// ===========================================
// Countdown Service
// ===========================================
// Business logic for countdown operations.
// Handles lifecycle, ownership, and plan limits.
//
// WHY SERVICE LAYER:
// - Encapsulates all countdown business rules
// - Enforces ownership and authorization
// - Manages status transitions
// - Enforces plan-based limits
import * as renderService from "./render.service.js";

import prisma from "../lib/prisma.js";
import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} from "../utils/errors.js";
import { getPlanLimits, isLimitExceeded } from "../config/plans.js";

/**
 * Default style configuration for new countdowns.
 */
const DEFAULT_STYLE_CONFIG = {
  fontFamily: "Arial, sans-serif",
  fontSize: 48,
  fontColor: "#FFFFFF",
  backgroundColor: "#1a1a2e",
  accentColor: "#e94560",
  layout: "horizontal",
  showLabels: true,
  labelStyle: "short", // 'short' (D H M S) or 'full' (Days Hours Minutes Seconds)
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  padding: 20,
  borderRadius: 8,
  showBranding: true, // Controlled by plan
};

/**
 * Calculates the current status of a countdown based on time.
 *
 * WHY SERVER-SIDE:
 * - Status is deterministic based on endAt
 * - No client manipulation possible
 * - Consistent across all API responses
 *
 * @param {Object} countdown - Countdown object
 * @returns {string} Calculated status
 */
export const calculateStatus = (countdown) => {
  // If manually disabled, keep disabled
  if (countdown.status === "DISABLED") {
    return "DISABLED";
  }

  // Check if expired based on time
  const now = new Date();
  const endAt = new Date(countdown.endAt);

  if (endAt <= now) {
    return "EXPIRED";
  }

  return "ACTIVE";
};

/**
 * Enriches a countdown object with calculated fields.
 *
 * @param {Object} countdown - Raw countdown from database
 * @returns {Object} Enriched countdown
 */
const enrichCountdown = (countdown) => {
  const calculatedStatus = calculateStatus(countdown);
  const now = new Date();
  const endAt = new Date(countdown.endAt);
  const remainingMs = Math.max(0, endAt - now);

  return {
    ...countdown,
    calculatedStatus,
    remainingMs,
    isExpired: calculatedStatus === "EXPIRED",
    isActive: calculatedStatus === "ACTIVE",
  };
};

/**
 * Creates a new countdown for a user.
 * Enforces plan limits before creation.
 *
 * @param {string} userId - Owner's user ID
 * @param {Object} data - Countdown data
 * @param {string} userPlan - User's current plan
 * @returns {Promise<Object>} Created countdown
 */
export const createCountdown = async (userId, data, userPlan) => {
  const { title, endAt, timezone = "UTC", styleConfig = {} } = data;

  // Get user's current usage
  const usageStats = await prisma.usageStats.findUnique({
    where: { userId },
  });

  if (!usageStats) {
    throw new BadRequestError("User usage stats not found");
  }

  // Check plan limits
  const limits = getPlanLimits(userPlan);

  if (
    isLimitExceeded(
      userPlan,
      "maxActiveCountdowns",
      usageStats.activeCountdowns
    )
  ) {
    throw new ForbiddenError(
      `You have reached your ${userPlan} plan limit of ${limits.maxActiveCountdowns} active countdowns. Please upgrade your plan or delete existing countdowns.`
    );
  }

  // Check countdown duration limit
  const endDate = new Date(endAt);
  const now = new Date();
  const daysUntilEnd = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

  if (daysUntilEnd > limits.countdownDurationDays) {
    throw new ForbiddenError(
      `Your ${userPlan} plan allows countdowns up to ${limits.countdownDurationDays} days. This countdown would run for ${daysUntilEnd} days.`
    );
  }

  // Merge style config with defaults
  // Enforce branding for plans that don't allow removal
  const finalStyleConfig = {
    ...DEFAULT_STYLE_CONFIG,
    ...styleConfig,
    showBranding: limits.removeBranding
      ? styleConfig.showBranding ?? false
      : true,
  };

  // Create countdown and update usage in transaction
  const [countdown] = await prisma.$transaction([
    prisma.countdown.create({
      data: {
        ownerId: userId,
        title,
        endAt: new Date(endAt),
        timezone,
        styleConfig: finalStyleConfig,
        status: "ACTIVE",
      },
    }),
    prisma.usageStats.update({
      where: { userId },
      data: {
        countdownsCreated: { increment: 1 },
        activeCountdowns: { increment: 1 },
      },
    }),
  ]);

  return enrichCountdown(countdown);
};

/**
 * Gets a countdown by ID with ownership check.
 *
 * @param {string} countdownId - Countdown ID
 * @param {string} userId - Requesting user's ID
 * @returns {Promise<Object>} Countdown
 */
export const getCountdownById = async (countdownId, userId) => {
  const countdown = await prisma.countdown.findUnique({
    where: { id: countdownId },
  });

  if (!countdown) {
    throw new NotFoundError("Countdown not found");
  }

  // Ownership check
  if (countdown.ownerId !== userId) {
    throw new ForbiddenError(
      "You do not have permission to access this countdown"
    );
  }

  return enrichCountdown(countdown);
};

/**
 * Gets all countdowns for a user with filtering and pagination.
 *
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated countdowns
 */
export const getUserCountdowns = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 10,
    status = "all",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  // Build where clause
  const where = { ownerId: userId };

  if (status !== "all") {
    where.status = status;
  }

  // Build orderBy
  const orderBy = { [sortBy]: sortOrder };

  // Execute queries
  const [countdowns, total] = await Promise.all([
    prisma.countdown.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.countdown.count({ where }),
  ]);

  // Enrich and sync status for each countdown
  const enrichedCountdowns = await Promise.all(
    countdowns.map(async (countdown) => {
      const enriched = enrichCountdown(countdown);

      // If status changed (e.g., became expired), update in DB
      if (
        enriched.calculatedStatus !== countdown.status &&
        countdown.status !== "DISABLED"
      ) {
        await syncCountdownStatus(
          countdown.id,
          userId,
          enriched.calculatedStatus
        );
      }

      return enriched;
    })
  );

  return {
    countdowns: enrichedCountdowns,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

/**
 * Updates a countdown with ownership check.
 *
 * @param {string} countdownId - Countdown ID
 * @param {string} userId - Requesting user's ID
 * @param {Object} data - Update data
 * @param {string} userPlan - User's current plan
 * @returns {Promise<Object>} Updated countdown
 */
export const updateCountdown = async (countdownId, userId, data, userPlan) => {
  // Get existing countdown with ownership check
  const existing = await getCountdownById(countdownId, userId);

  // Check if countdown is expired (cannot edit expired countdowns)
  if (existing.calculatedStatus === "EXPIRED" && data.status !== "DISABLED") {
    throw new BadRequestError(
      "Cannot edit an expired countdown. Create a new one instead."
    );
  }

  const { title, endAt, timezone, status, styleConfig } = data;
  const updateData = {};

  // Update title if provided
  if (title !== undefined) {
    updateData.title = title;
  }

  // Update endAt if provided
  if (endAt !== undefined) {
    const endDate = new Date(endAt);
    const now = new Date();
    const daysUntilEnd = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    const limits = getPlanLimits(userPlan);

    if (daysUntilEnd > limits.countdownDurationDays) {
      throw new ForbiddenError(
        `Your ${userPlan} plan allows countdowns up to ${limits.countdownDurationDays} days.`
      );
    }

    updateData.endAt = endDate;
  }

  // Update timezone if provided
  if (timezone !== undefined) {
    updateData.timezone = timezone;
  }

  // Update status if provided
  if (status !== undefined) {
    // Can only manually set to ACTIVE or DISABLED
    // EXPIRED is determined by time
    if (status === "ACTIVE") {
      // Can only reactivate if not time-expired
      const checkDate = updateData.endAt || existing.endAt;
      if (new Date(checkDate) <= new Date()) {
        throw new BadRequestError(
          "Cannot set status to ACTIVE for an expired countdown"
        );
      }
    }
    updateData.status = status;
  }

  // Update styleConfig if provided
  if (styleConfig !== undefined) {
    const limits = getPlanLimits(userPlan);
    const mergedConfig = {
      ...existing.styleConfig,
      ...styleConfig,
      // Enforce branding for plans that don't allow removal
      showBranding: limits.removeBranding
        ? styleConfig.showBranding ?? existing.styleConfig.showBranding
        : true,
    };
    updateData.styleConfig = mergedConfig;
  }

  // Perform update
  const updated = await prisma.countdown.update({
    where: { id: countdownId },
    data: updateData,
  });

  return enrichCountdown(updated);
};

/**
 * Deletes a countdown with ownership check.
 * Updates usage stats accordingly.
 *
 * @param {string} countdownId - Countdown ID
 * @param {string} userId - Requesting user's ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteCountdown = async (countdownId, userId) => {
  // Get existing countdown with ownership check
  const existing = await getCountdownById(countdownId, userId);

  // Delete countdown and update usage in transaction
  const decrementActive = existing.calculatedStatus === "ACTIVE" ? 1 : 0;

  await prisma.$transaction([
    prisma.countdown.delete({
      where: { id: countdownId },
    }),
    prisma.usageStats.update({
      where: { userId },
      data: {
        activeCountdowns: { decrement: decrementActive },
      },
    }),
  ]);

  return true;
};

/**
 * Syncs countdown status in database if it has changed.
 * Called when calculated status differs from stored status.
 *
 * @param {string} countdownId - Countdown ID
 * @param {string} userId - User ID
 * @param {string} newStatus - New status to set
 */
const syncCountdownStatus = async (countdownId, userId, newStatus) => {
  const countdown = await prisma.countdown.findUnique({
    where: { id: countdownId },
  });

  if (!countdown || countdown.status === newStatus) {
    return;
  }

  // Update status
  await prisma.countdown.update({
    where: { id: countdownId },
    data: { status: newStatus },
  });

  // If transitioning from ACTIVE to EXPIRED, decrement active count
  if (countdown.status === "ACTIVE" && newStatus === "EXPIRED") {
    await prisma.usageStats.update({
      where: { userId },
      data: {
        activeCountdowns: { decrement: 1 },
      },
    });
  }
};

/**
 * Gets countdown summary stats for a user.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Countdown statistics
 */
export const getCountdownStats = async (userId) => {
  const [total, active, expired, disabled] = await Promise.all([
    prisma.countdown.count({ where: { ownerId: userId } }),
    prisma.countdown.count({ where: { ownerId: userId, status: "ACTIVE" } }),
    prisma.countdown.count({ where: { ownerId: userId, status: "EXPIRED" } }),
    prisma.countdown.count({ where: { ownerId: userId, status: "DISABLED" } }),
  ]);

  return {
    total,
    active,
    expired,
    disabled,
  };
};

/**
 * Batch update expired countdowns.
 * Called periodically or on-demand to sync statuses.
 *
 * @returns {Promise<number>} Number of countdowns updated
 */
export const expireCountdowns = async () => {
  const now = new Date();

  // Find all active countdowns that should be expired
  const toExpire = await prisma.countdown.findMany({
    where: {
      status: "ACTIVE",
      endAt: { lte: now },
    },
    select: {
      id: true,
      ownerId: true,
    },
  });

  if (toExpire.length === 0) {
    return 0;
  }

  // Group by owner for usage stats update
  const ownerCounts = toExpire.reduce((acc, c) => {
    acc[c.ownerId] = (acc[c.ownerId] || 0) + 1;
    return acc;
  }, {});

  // Update statuses and usage stats in transaction
  await prisma.$transaction([
    // Update all expired countdowns
    prisma.countdown.updateMany({
      where: {
        id: { in: toExpire.map((c) => c.id) },
      },
      data: { status: "EXPIRED" },
    }),
    // Update usage stats for each owner
    ...Object.entries(ownerCounts).map(([ownerId, count]) =>
      prisma.usageStats.update({
        where: { userId: ownerId },
        data: { activeCountdowns: { decrement: count } },
      })
    ),
  ]);

  return toExpire.length;
};

/**
 * Gets public countdown data for rendering.
 * Used by render service to fetch countdown without ownership check.
 *
 * @param {string} countdownId - Countdown ID
 * @returns {Promise<Object>} Countdown with owner info
 */
export const getCountdownForRender = async (countdownId) => {
  const countdown = await prisma.countdown.findUnique({
    where: { id: countdownId },
    include: {
      owner: {
        select: {
          id: true,
          plan: true,
          isActive: true,
        },
      },
    },
  });

  if (!countdown) {
    throw new NotFoundError("Countdown not found");
  }

  return countdown;
};
