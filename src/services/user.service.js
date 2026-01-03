// ===========================================
// User Service
// ===========================================
// Business logic for user profile management and usage tracking.

import prisma from "../lib/prisma.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { getPlanLimits } from "../config/plans.js";

/**
 * Gets a user by ID with their usage stats.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User with usage stats
 */
export const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      plan: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

/**
 * Gets user profile with plan limits.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User profile with limits
 */
export const getUserProfile = async (userId) => {
  const user = await getUserById(userId);
  const limits = getPlanLimits(user.plan);

  return {
    ...user,
    limits,
  };
};

/**
 * Updates user profile fields.
 * Only allows updating safe fields (not role, plan, etc.).
 *
 * WHY EXPLICIT FIELD SELECTION:
 * - Prevents mass assignment vulnerabilities
 * - User can't escalate their own privileges
 *
 * @param {string} userId - User ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated user
 */
export const updateProfile = async (userId, data) => {
  // Only allow these fields to be updated by user
  const allowedFields = ["name"];

  const updateData = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new BadRequestError("No valid fields to update");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      plan: true,
      isActive: true,
      updatedAt: true,
    },
  });

  return user;
};

/**
 * Gets user's usage statistics.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Usage stats with limits
 */
export const getUsageStats = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      usageStats: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const limits = getPlanLimits(user.plan);
  const stats = user.usageStats;

  return {
    current: {
      countdownsCreated: stats?.countdownsCreated || 0,
      activeCountdowns: stats?.activeCountdowns || 0,
      monthlyViews: stats?.monthlyViews || 0,
      totalViews: stats?.totalViews || 0,
    },
    limits: {
      maxActiveCountdowns: limits.maxActiveCountdowns,
      monthlyViews: limits.monthlyViews,
    },
    remaining: {
      countdowns: Math.max(
        0,
        limits.maxActiveCountdowns - (stats?.activeCountdowns || 0)
      ),
      views:
        limits.monthlyViews === Infinity
          ? Infinity
          : Math.max(0, limits.monthlyViews - (stats?.monthlyViews || 0)),
    },
    period: {
      start: stats?.currentPeriodStart,
      end: stats?.currentPeriodEnd,
    },
    plan: user.plan,
  };
};

/**
 * Increments a usage counter.
 * Used internally by countdown service.
 *
 * @param {string} userId - User ID
 * @param {string} field - Field to increment
 * @param {number} [amount=1] - Amount to increment
 * @returns {Promise<Object>} Updated stats
 */
export const incrementUsage = async (userId, field, amount = 1) => {
  const validFields = [
    "countdownsCreated",
    "activeCountdowns",
    "monthlyViews",
    "totalViews",
  ];

  if (!validFields.includes(field)) {
    throw new BadRequestError(`Invalid usage field: ${field}`);
  }

  return prisma.usageStats.update({
    where: { userId },
    data: {
      [field]: { increment: amount },
    },
  });
};

/**
 * Decrements active countdown count.
 * Used when a countdown is deleted or expires.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Updated stats
 */
export const decrementActiveCountdowns = async (userId) => {
  return prisma.usageStats.update({
    where: { userId },
    data: {
      activeCountdowns: { decrement: 1 },
    },
  });
};

/**
 * Resets monthly usage stats.
 * Called at the start of each billing period.
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Updated stats
 */
export const resetMonthlyUsage = async (userId) => {
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

  return prisma.usageStats.update({
    where: { userId },
    data: {
      monthlyViews: 0,
      currentPeriodStart: new Date(),
      currentPeriodEnd,
    },
  });
};

/**
 * Soft deletes a user account.
 * Sets isActive to false instead of hard delete.
 *
 * WHY SOFT DELETE:
 * - Preserves data for billing disputes
 * - Allows account recovery
 * - Maintains referential integrity
 *
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} Success status
 */
export const deactivateAccount = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });

  // Delete all refresh tokens
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });

  return true;
};

/**
 * Lists all users (admin only).
 * Supports pagination and filtering.
 *
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated user list
 */
export const listUsers = async (options = {}) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    plan = null,
    isActive = null,
  } = options;

  const where = {};

  if (search) {
    where.OR = [
      { email: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  if (plan) {
    where.plan = plan;
  }

  if (isActive !== null) {
    where.isActive = isActive;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { refreshTokens: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
