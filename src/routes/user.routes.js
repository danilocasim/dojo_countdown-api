// ===========================================
// User Routes
// ===========================================
// Defines all user-related endpoints.

import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize, requireAdmin } from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import { changePasswordValidator } from "../validators/auth.validator.js";
import {
  updateProfileValidator,
  listUsersValidator,
  userIdValidator,
} from "../validators/user.validator.js";
import { passwordLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

// ===========================================
// Current User Routes (/api/v1/users/me)
// ===========================================

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", authenticate, userController.getProfile);

/**
 * @route   PATCH /api/v1/users/me
 * @desc    Update current user's profile
 * @access  Private
 */
router.patch(
  "/me",
  authenticate,
  updateProfileValidator,
  validate,
  userController.updateProfile
);

/**
 * @route   PATCH /api/v1/users/me/password
 * @desc    Change current user's password
 * @access  Private
 * @ratelimit 5 requests per 15 minutes per IP
 */
router.patch(
  "/me/password",
  authenticate,
  passwordLimiter,
  changePasswordValidator,
  validate,
  userController.changePassword
);

/**
 * @route   GET /api/v1/users/me/usage
 * @desc    Get current user's usage statistics
 * @access  Private
 */
router.get("/me/usage", authenticate, userController.getUsage);

/**
 * @route   DELETE /api/v1/users/me
 * @desc    Deactivate current user's account
 * @access  Private
 */
router.delete("/me", authenticate, userController.deleteAccount);

// ===========================================
// Admin Routes (/api/v1/users)
// For future admin dashboard
// ===========================================

/**
 * @route   GET /api/v1/users
 * @desc    List all users (admin only)
 * @access  Private (Admin)
 */
router.get(
  "/",
  authenticate,
  requireAdmin,
  listUsersValidator,
  validate,
  userController.listUsers
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID (admin only)
 * @access  Private (Admin)
 */
router.get(
  "/:id",
  authenticate,
  requireAdmin,
  userIdValidator,
  validate,
  userController.getUserById
);

export default router;
