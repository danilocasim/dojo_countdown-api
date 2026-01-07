// ===========================================
// Usage Service
// ===========================================
// Handles monthly usage tracking and quota enforcement.
//
// WHY THIS DESIGN:
// - Calendar month based (not rolling) - matches MotionMail
// - UTC-based to avoid timezone complexity
// - Atomic increments to prevent race conditions
// - viewsLimit copied to UsageMonth at creation (snapshot)
// - Scales for high-traffic image endpoints

import prisma from "../lib/prisma.js";
import { getMonthlyViewLimit } from "../config/plans.js";

/**
 * Gets the current UTC year and month.
 *
 * WHY UTC:
 * - Consistent across all server locations
 * - No daylight saving complications
 * - Matches industry standard (MotionMail)
 * - All users reset at same UTC midnight
 *
 * @returns {Object} { year, month }
 */
export const getCurrentPeriod = () => {
  const now = new Date();
  return {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1, // 1-12
  };
};

/**
 * Gets or creates usage record for the current month.
 * Uses upsert for idempotent creation under concurrent requests.
 *
 * @param {string} userId - User ID
 * @param {string} plan - User's current plan
 * @returns {Promise<Object>} UsageMonth record
 */
export const getOrCreateUsageMonth = async (userId, plan) => {
  const { year, month } = getCurrentPeriod();
  const viewsLimit = getMonthlyViewLimit(plan);

  // Upsert ensures idempotent creation under concurrent requests
  const usageMonth = await prisma.usageMonth.upsert({
    where: {
      userId_year_month: {
        userId,
        year,
        month,
      },
    },
    update: {}, // No update needed if exists
    create: {
      userId,
      year,
      month,
      viewsUsed: 0,
      viewsLimit,
    },
  });

  return usageMonth;
};

/**
 * Checks if user has exceeded their monthly quota.
 *
 * @param {string} userId - User ID
 * @param {string} plan - User's current plan
 * @returns {Promise<Object>} { exceeded, usage, remaining }
 */
export const checkQuota = async (userId, plan) => {
  const usage = await getOrCreateUsageMonth(userId, plan);

  const exceeded = usage.viewsUsed >= usage.viewsLimit;
  const remaining = Math.max(0, usage.viewsLimit - usage.viewsUsed);

  return {
    exceeded,
    usage: {
      used: usage.viewsUsed,
      limit: usage.viewsLimit,
      year: usage.year,
      month: usage.month,
    },
    remaining,
    percentUsed: Math.round((usage.viewsUsed / usage.viewsLimit) * 100),
  };
};

/**
 * Atomically increments usage and returns updated state.
 * Uses transaction to prevent race conditions under high traffic.
 *
 * IMPORTANT: This should be called AFTER rendering, not before.
 * Why? If rendering fails, we shouldn't count the view.
 *
 * @param {string} userId - User ID
 * @param {string} plan - User's current plan
 * @param {number} amount - Amount to increment (default 1)
 * @returns {Promise<Object>} Updated usage state
 */
export const incrementUsage = async (userId, plan, amount = 1) => {
  const { year, month } = getCurrentPeriod();
  const viewsLimit = getMonthlyViewLimit(plan);

  // Use raw query for atomic increment with upsert behavior
  // This handles both creation and increment atomically
  const usage = await prisma.$transaction(async (tx) => {
    // First, ensure the record exists
    await tx.usageMonth.upsert({
      where: {
        userId_year_month: { userId, year, month },
      },
      update: {},
      create: {
        userId,
        year,
        month,
        viewsUsed: 0,
        viewsLimit,
      },
    });

    // Then atomically increment
    return tx.usageMonth.update({
      where: {
        userId_year_month: { userId, year, month },
      },
      data: {
        viewsUsed: { increment: amount },
      },
    });
  });

  return {
    used: usage.viewsUsed,
    limit: usage.viewsLimit,
    remaining: Math.max(0, usage.viewsLimit - usage.viewsUsed),
    exceeded: usage.viewsUsed >= usage.viewsLimit,
  };
};

/**
 * Gets usage history for a user.
 *
 * @param {string} userId - User ID
 * @param {number} months - Number of months to retrieve
 * @returns {Promise<Array>} Usage history
 */
export const getUsageHistory = async (userId, months = 6) => {
  const history = await prisma.usageMonth.findMany({
    where: { userId },
    orderBy: [{ year: "desc" }, { month: "desc" }],
    take: months,
  });

  return history.map((h) => ({
    year: h.year,
    month: h.month,
    period: `${h.year}-${String(h.month).padStart(2, "0")}`,
    used: h.viewsUsed,
    limit: h.viewsLimit,
    percentUsed: Math.round((h.viewsUsed / h.viewsLimit) * 100),
  }));
};

/**
 * Gets current month usage summary for a user.
 *
 * @param {string} userId - User ID
 * @param {string} plan - User's current plan
 * @returns {Promise<Object>} Current usage summary
 */
export const getCurrentUsage = async (userId, plan) => {
  const { year, month } = getCurrentPeriod();
  const usage = await getOrCreateUsageMonth(userId, plan);

  // Calculate days remaining in month
  const now = new Date();
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const currentDay = now.getUTCDate();
  const daysRemaining = lastDay - currentDay;

  return {
    period: {
      year,
      month,
      label: new Date(Date.UTC(year, month - 1)).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      daysRemaining,
    },
    views: {
      used: usage.viewsUsed,
      limit: usage.viewsLimit,
      remaining: Math.max(0, usage.viewsLimit - usage.viewsUsed),
      percentUsed: Math.round((usage.viewsUsed / usage.viewsLimit) * 100),
    },
    status:
      usage.viewsUsed >= usage.viewsLimit
        ? "exceeded"
        : usage.viewsUsed >= usage.viewsLimit * 0.9
        ? "warning"
        : "ok",
  };
};

/**
 * Resets usage for a specific month (admin function).
 *
 * @param {string} userId - User ID
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Promise<Object>} Reset usage record
 */
export const resetUsage = async (userId, year, month) => {
  return prisma.usageMonth.update({
    where: {
      userId_year_month: { userId, year, month },
    },
    data: {
      viewsUsed: 0,
    },
  });
};

export default {
  getCurrentPeriod,
  getOrCreateUsageMonth,
  checkQuota,
  incrementUsage,
  getUsageHistory,
  getCurrentUsage,
  resetUsage,
};
