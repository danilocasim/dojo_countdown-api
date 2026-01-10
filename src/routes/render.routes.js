// ===========================================
// Render Routes
// ===========================================
// Public routes for countdown image rendering.
// No authentication required for image endpoints.

import { Router } from "express";
import * as renderController from "../controllers/render.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { renderLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

/**
 * @route   GET /api/v1/render/:id
 * @route   GET /api/v1/render/:id.png
 * @route   GET /api/v1/render/:id.jpg
 * @desc    Render countdown image
 * @access  Public
 * @ratelimit 1000 requests per minute per IP
 */

router.get("/:id/embed", renderController.getEmbedCode);

router.get("/:id", renderLimiter, renderController.renderCountdownImage);

/**
 * @route   GET /api/v1/render/:id/embed
 * @desc    Get embed codes for countdown
 * @access  Public
 */

/**
 * @route   POST /api/v1/render/preview
 * @desc    Render style preview (authenticated)
 * @access  Private
 */
router.post("/preview", authenticate, renderController.renderPreview);

export default router;
