// ===========================================
// Countdown Routes
// ===========================================
// Defines all countdown-related endpoints.

import { Router } from "express";
import * as countdownController from "../controllers/countdown.controller.js";
import { authenticate } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import {
  createCountdownValidator,
  updateCountdownValidator,
  getCountdownValidator,
  deleteCountdownValidator,
  listCountdownsValidator,
} from "../validators/countdown.validator.js";

const router = Router();

// All countdown routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/countdowns
 * @desc    Create a new countdown
 * @access  Private
 */
router.post(
  "/",
  createCountdownValidator,
  validate,
  countdownController.createCountdown
);

/**
 * @route   GET /api/v1/countdowns
 * @desc    Get all countdowns for the authenticated user
 * @access  Private
 */
router.get(
  "/",
  listCountdownsValidator,
  validate,
  countdownController.getCountdowns
);

/**
 * @route   GET /api/v1/countdowns/stats
 * @desc    Get countdown statistics
 * @access  Private
 */
router.get("/stats", countdownController.getCountdownStats);

/**
 * @route   GET /api/v1/countdowns/:id
 * @desc    Get a specific countdown by ID
 * @access  Private
 */
router.get(
  "/:id",
  getCountdownValidator,
  validate,
  countdownController.getCountdown
);

/**
 * @route   PUT /api/v1/countdowns/:id
 * @desc    Update a countdown
 * @access  Private
 */
router.put(
  "/:id",
  updateCountdownValidator,
  validate,
  countdownController.updateCountdown
);

/**
 * @route   DELETE /api/v1/countdowns/:id
 * @desc    Delete a countdown
 * @access  Private
 */
router.delete(
  "/:id",
  deleteCountdownValidator,
  validate,
  countdownController.deleteCountdown
);

export default router;
