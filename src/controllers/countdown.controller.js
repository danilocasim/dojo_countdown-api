// ===========================================
// Countdown Controller
// ===========================================
// Thin HTTP handlers for countdown endpoints.
// All business logic is delegated to countdown.service.js.

import * as countdownService from "../services/countdown.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * POST /api/v1/countdowns
 * Creates a new countdown for the authenticated user.
 */
export const createCountdown = asyncHandler(async (req, res) => {
  const countdown = await countdownService.createCountdown(
    req.user.id,
    req.body,
    req.user.plan
  );

  res.status(201).json({
    success: true,
    message: "Countdown created successfully",
    data: countdown,
  });
});

/**
 * GET /api/v1/countdowns
 * Gets all countdowns for the authenticated user.
 */
export const getCountdowns = asyncHandler(async (req, res) => {
  const { page, limit, status, sortBy, sortOrder } = req.query;

  const result = await countdownService.getUserCountdowns(req.user.id, {
    page,
    limit,
    status,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/v1/countdowns/stats
 * Gets countdown statistics for the authenticated user.
 */
export const getCountdownStats = asyncHandler(async (req, res) => {
  const stats = await countdownService.getCountdownStats(req.user.id);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * GET /api/v1/countdowns/:id
 * Gets a specific countdown by ID.
 */
export const getCountdown = asyncHandler(async (req, res) => {
  const countdown = await countdownService.getCountdownById(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: countdown,
  });
});

/**
 * PUT /api/v1/countdowns/:id
 * Updates a countdown.
 */
export const updateCountdown = asyncHandler(async (req, res) => {
  const countdown = await countdownService.updateCountdown(
    req.params.id,
    req.user.id,
    req.body,
    req.user.plan
  );

  res.status(200).json({
    success: true,
    message: "Countdown updated successfully",
    data: countdown,
  });
});

/**
 * DELETE /api/v1/countdowns/:id
 * Deletes a countdown.
 */
export const deleteCountdown = asyncHandler(async (req, res) => {
  await countdownService.deleteCountdown(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Countdown deleted successfully",
  });
});
