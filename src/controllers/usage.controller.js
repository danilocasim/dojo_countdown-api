// ===========================================
// Usage Controller
// ===========================================
// Handles HTTP requests for usage statistics.

import * as usageService from "../services/usage.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/v1/usage
 *
 * Returns current month usage for authenticated user.
 */
export const getCurrentUsage = asyncHandler(async (req, res) => {
  const usage = await usageService.getCurrentUsage(req.user.id, req.user.plan);

  res.json({
    success: true,
    data: usage,
  });
});

/**
 * GET /api/v1/usage/history
 *
 * Returns usage history for authenticated user.
 */
export const getUsageHistory = asyncHandler(async (req, res) => {
  const months = parseInt(req.query.months) || 6;
  const history = await usageService.getUsageHistory(
    req.user.id,
    Math.min(months, 12)
  );

  res.json({
    success: true,
    data: {
      history,
      months: history.length,
    },
  });
});

/**
 * GET /api/v1/usage/check
 *
 * Quick quota check for authenticated user.
 */
export const checkQuota = asyncHandler(async (req, res) => {
  const quota = await usageService.checkQuota(req.user.id, req.user.plan);

  res.json({
    success: true,
    data: quota,
  });
});

export default {
  getCurrentUsage,
  getUsageHistory,
  checkQuota,
};
