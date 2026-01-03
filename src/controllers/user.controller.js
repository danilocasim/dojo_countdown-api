// ===========================================
// User Controller
// ===========================================
// Thin HTTP handlers for user-related endpoints.

import * as userService from "../services/user.service.js";
import * as authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/v1/users/me
 * Returns current user's profile with plan limits.
 */
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getUserProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/**
 * PATCH /api/v1/users/me
 * Updates current user's profile.
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

/**
 * PATCH /api/v1/users/me/password
 * Changes current user's password.
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

/**
 * GET /api/v1/users/me/usage
 * Returns current user's usage statistics.
 */
export const getUsage = asyncHandler(async (req, res) => {
  const usage = await userService.getUsageStats(req.user.id);

  res.status(200).json({
    success: true,
    data: usage,
  });
});

/**
 * DELETE /api/v1/users/me
 * Soft deletes current user's account.
 */
export const deleteAccount = asyncHandler(async (req, res) => {
  await userService.deactivateAccount(req.user.id);

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});

// ===========================================
// Admin Endpoints (Future)
// ===========================================

/**
 * GET /api/v1/admin/users
 * Lists all users with pagination (admin only).
 */
export const listUsers = asyncHandler(async (req, res) => {
  const { page, limit, search, plan, isActive } = req.query;

  const result = await userService.listUsers({
    page,
    limit,
    search,
    plan,
    isActive,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/v1/admin/users/:id
 * Gets a specific user by ID (admin only).
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
