// ===========================================
// Render Service
// ===========================================
// Business logic for countdown image rendering.
// Bridges countdown domain with rendering engine.
//
// WHY SERVICE:
// - Validates countdown before rendering
// - Enforces plan-based rendering rules
// - Handles errors gracefully
// - Single point for render logic

import prisma from "../lib/prisma.js";
import {
  renderCountdown,
  renderPreview,
  calculateOptimalFrameCount,
  estimateGifSize,
} from "../render/renderer.js";
import { calculateRemainingTime } from "../render/time.utils.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

/**
 * Renders a countdown image by ID.
 * Public endpoint - no authentication required.
 *
 * @param {string} countdownId - Countdown ID
 * @param {Object} options - Rendering options
 * @returns {Promise<Object>} Image buffer and metadata
 */
export const renderCountdownById = async (countdownId, options = {}) => {
  const { format = "png" } = options;

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

  // Calculate time for metadata and GIF frame optimization
  const time = calculateRemainingTime(countdown.endAt, countdown.timezone);

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

  return {
    buffer: imageBuffer,
    contentType,
    metadata: {
      countdownId: countdown.id,
      ownerId: countdown.owner.id,
      isExpired: time.isExpired,
      remainingMs: time.totalMs,
      timezone: countdown.timezone,
      format,
      frameCount: format === "gif" ? frameCount : undefined,
      generatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Renders a preview image for a style configuration.
 * Used by authenticated users to preview styles.
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

  const time = calculateRemainingTime(countdown.endAt, countdown.timezone);
  const remainingSeconds = Math.floor(time.totalMs / 1000);
  const optimalFrameCount = calculateOptimalFrameCount(remainingSeconds);
  const gifEstimate = estimateGifSize(
    countdown.styleConfig || {},
    optimalFrameCount
  );

  return {
    countdownId: countdown.id,
    viewCount: countdown.viewCount,
    status: countdown.status,
    isExpired: time.isExpired,
    remainingMs: time.totalMs,
    gifEstimate,
  };
};

/**
 * Increments view count for a countdown.
 * Called asynchronously to not block render response.
 *
 * @param {string} countdownId - Countdown ID
 * @param {string} userId - Owner's user ID (for usage stats)
 */
export const incrementViewCount = async (countdownId, userId) => {
  try {
    await prisma.$transaction([
      // Increment countdown view count
      prisma.countdown.update({
        where: { id: countdownId },
        data: { viewCount: { increment: 1 } },
      }),
      // Increment user's monthly and total views
      prisma.usageStats.update({
        where: { userId },
        data: {
          monthlyViews: { increment: 1 },
          totalViews: { increment: 1 },
        },
      }),
    ]);
  } catch (error) {
    // Log but don't fail render
    console.error("Failed to increment view count:", error.message);
  }
};

export default {
  renderCountdownById,
  renderStylePreview,
  getRenderStats,
  incrementViewCount,
};
