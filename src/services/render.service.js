// ===========================================
// Render Service
// ===========================================
// Business logic for countdown image rendering.
// Integrates usage tracking and quota enforcement.
//
// WHY SERVICE:
// - Validates countdown before rendering
// - Enforces plan-based rendering rules
// - Tracks usage atomically
// - Handles quota exceeded gracefully

import prisma from "../lib/prisma.js";
import { renderCountdown, renderPreview } from "../render/renderer.js";
import { getQuotaExceededImage } from "../render/quota.renderer.js";
import { calculateRemainingTime } from "../render/time.utils.js";
import * as usageService from "./usage.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

/**
 * Renders a countdown image by ID.
 * Public endpoint - no authentication required.
 * Includes usage tracking and quota enforcement.
 *
 * @param {string} countdownId - Countdown ID
 * @param {Object} options - Rendering options
 * @returns {Promise<Object>} Image buffer and metadata
 */
export const renderCountdownById = async (countdownId, options = {}) => {
  const { format = "gif" } = options;

  // Fetch countdown with owner's plan
  const countdown = await prisma.countdown.findUnique({
    where: { id: countdownId },
    include: {
      owner: {
        select: {
          id: true,
          plan: true,
          isActive: true,
        },
      },
    },
  });

  // Validate countdown exists
  if (!countdown) {
    throw new NotFoundError("Countdown not found");
  }

  // Check if countdown is disabled
  if (countdown.status === "DISABLED") {
    throw new BadRequestError("This countdown is currently disabled");
  }

  // Check if owner's account is active
  if (!countdown.owner.isActive) {
    throw new BadRequestError("This countdown is no longer available");
  }

  // Check quota BEFORE rendering
  const quotaCheck = await usageService.checkQuota(
    countdown.owner.id,
    countdown.owner.plan
  );

  // If quota exceeded, return quota exceeded image
  if (quotaCheck.exceeded) {
    const quotaImage = getQuotaExceededImage();

    return {
      buffer: quotaImage,
      contentType: "image/png",
      quotaExceeded: true,
      metadata: {
        countdownId: countdown.id,
        ownerId: countdown.owner.id,
        isExpired: false,
        remainingMs: 0,
        timezone: countdown.timezone,
        format: "png",
        quotaExceeded: true,
        usage: quotaCheck.usage,
        generatedAt: new Date().toISOString(),
      },
    };
  }

  // Calculate time for metadata and GIF frame optimization
  const time = calculateRemainingTime(countdown.endAt);

  // For GIF, calculate optimal frame count
  let frameCount = options.frameCount;
  if (format === "gif" && !frameCount) {
    const remainingSeconds = Math.floor(time.totalMs / 1000);
    frameCount = calculateOptimalFrameCount(remainingSeconds);
  }

  // Render the image
  const imageBuffer = await renderCountdown(countdown, {
    format,
    frameCount,
    userPlan: countdown.owner.plan,
  });

  // Determine content type
  let contentType;
  switch (format) {
    case "gif":
      contentType = "image/gif";
      break;
    case "jpeg":
    case "jpg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "image/png";
  }

  // Increment usage AFTER successful render
  // Non-blocking - don't wait for it
  incrementUsageAsync(countdown.owner.id, countdown.owner.plan, countdown.id);

  return {
    buffer: imageBuffer,
    contentType,
    quotaExceeded: false,
    metadata: {
      countdownId: countdown.id,
      ownerId: countdown.owner.id,
      isExpired: time.isExpired,
      remainingMs: time.totalMs,
      timezone: countdown.timezone,
      format,
      frameCount: format === "gif" ? frameCount : undefined,
      usage: quotaCheck.usage,
      generatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Increments usage asynchronously.
 * Non-blocking to not slow down image response.
 *
 * @param {string} userId - User ID
 * @param {string} plan - User's plan
 * @param {string} countdownId - Countdown ID (for per-countdown tracking)
 */
const incrementUsageAsync = async (userId, plan, countdownId) => {
  try {
    // Increment monthly usage
    await usageService.incrementUsage(userId, plan);

    // Also increment countdown view count
    await prisma.countdown.update({
      where: { id: countdownId },
      data: { viewCount: { increment: 1 } },
    });
  } catch (error) {
    // Log but don't fail - usage tracking shouldn't break rendering
    console.error("Failed to increment usage:", error.message);
  }
};

/**
 * Calculates optimal frame count for GIF based on remaining time.
 *
 * @param {number} remainingSeconds - Seconds until expiry
 * @returns {number} Recommended frame count
 */
const calculateOptimalFrameCount = (remainingSeconds) => {
  if (remainingSeconds <= 0) return 1;
  if (remainingSeconds <= 30) return remainingSeconds;
  if (remainingSeconds <= 60) return 30;
  if (remainingSeconds <= 300) return 45;
  return 60;
};

/**
 * Renders a preview image for a style configuration.
 * Used by authenticated users to preview styles.
 * Does NOT count against usage.
 *
 * @param {Object} styleConfig - Style configuration
 * @param {string} userPlan - User's plan for branding check
 * @param {string} format - Output format (png, jpeg, gif)
 * @returns {Promise<Buffer>} Image buffer
 */
export const renderStylePreview = async (
  styleConfig,
  userPlan = "FREE",
  format = "png"
) => {
  return renderPreview(
    {
      ...styleConfig,
      showBranding:
        userPlan === "FREE" ? true : styleConfig.showBranding ?? false,
    },
    { format, userPlan }
  );
};

/**
 * Gets render statistics for a countdown.
 *
 * @param {string} countdownId - Countdown ID
 * @returns {Promise<Object>} Render statistics
 */
export const getRenderStats = async (countdownId) => {
  const countdown = await prisma.countdown.findUnique({
    where: { id: countdownId },
    select: {
      id: true,
      viewCount: true,
      status: true,
      endAt: true,
      timezone: true,
      styleConfig: true,
    },
  });

  if (!countdown) {
    throw new NotFoundError("Countdown not found");
  }

  const time = calculateRemainingTime(countdown.endAt);
  const remainingSeconds = Math.floor(time.totalMs / 1000);
  const optimalFrameCount = calculateOptimalFrameCount(remainingSeconds);

  return {
    countdownId: countdown.id,
    viewCount: countdown.viewCount,
    status: countdown.status,
    isExpired: time.isExpired,
    remainingMs: time.totalMs,
    recommendedFrames: optimalFrameCount,
  };
};

export default {
  renderCountdownById,
  renderStylePreview,
  getRenderStats,
};
