// ===========================================
// Render Routes
// ===========================================
// Public routes for countdown image rendering.
// No authentication required for image endpoints.

import { Router } from "express";
import * as renderController from "../controllers/render.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  renderPublicLimiter,
  renderBurstLimiter,
} from "../middlewares/rateLimiter.js";
import { abuseGuard } from "../middlewares/abuseGuard.js";

const router = Router();

/**
 * @route   GET /api/v1/render/:id
 * @route   GET /api/v1/render/:id.png
 * @route   GET /api/v1/render/:id.jpg
 * @desc    Render countdown image
 * @access  Public
 * @ratelimit 300/min sustained (Redis-backed)
 * @ratelimit 60/10s burst (Redis-backed)
 * @middleware abuseGuard — cache-busting detection
 */

router.get("/:id/embed", renderController.getEmbedCode);

router.get(
  "/:id",
  renderBurstLimiter,
  renderPublicLimiter,
  abuseGuard(),
  renderController.renderCountdownImage,
);

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
