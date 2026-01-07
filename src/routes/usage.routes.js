// ===========================================
// Usage Routes
// ===========================================
// Defines usage statistics endpoints.

import { Router } from "express";
import * as usageController from "../controllers/usage.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// All usage routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/usage
 * @desc    Get current month usage
 * @access  Private
 */
router.get("/", usageController.getCurrentUsage);

/**
 * @route   GET /api/v1/usage/history
 * @desc    Get usage history
 * @access  Private
 */
router.get("/history", usageController.getUsageHistory);

/**
 * @route   GET /api/v1/usage/check
 * @desc    Quick quota check
 * @access  Private
 */
router.get("/check", usageController.checkQuota);

export default router;
