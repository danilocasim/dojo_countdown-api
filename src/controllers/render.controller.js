// ===========================================
// Render Controller
// ===========================================
// Handles HTTP requests for countdown image rendering.
// Returns binary image data, not JSON.
//
// WHY SEPARATE CONTROLLER:
// - Different response format (binary vs JSON)
// - No authentication required
// - Special caching headers
// - Streaming response

import * as renderService from "../services/render.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/v1/render/:id
 * GET /api/v1/render/:id.png
 * GET /api/v1/render/:id.gif
 * GET /api/v1/render/:id.jpg
 *
 * Renders and returns a countdown image.
 * Public endpoint - no authentication.
 */
export const renderCountdownImage = asyncHandler(async (req, res) => {
  // Extract ID and format from params
  let { id } = req.params;
  let format = "gif"; // Default to GIF for email compatibility

  // Check if format is in the ID (e.g., "abc123.gif")
  if (id.includes(".")) {
    const parts = id.split(".");
    id = parts[0];
    const ext = parts[1].toLowerCase();
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
      format = ext === "jpg" ? "jpeg" : ext;
    }
  }

  // Query param override
  if (req.query.format) {
    const queryFormat = req.query.format.toLowerCase();
    if (["png", "jpg", "jpeg", "gif"].includes(queryFormat)) {
      format = queryFormat === "jpg" ? "jpeg" : queryFormat;
    }
  }

  // Frame count override for GIF (optional)
  const frameCount = req.query.frames
    ? parseInt(req.query.frames, 10)
    : undefined;

  // Render the countdown
  const result = await renderService.renderCountdownById(id, {
    format,
    frameCount,
  });

  // Set email-safe headers to prevent caching
  setNoCacheHeaders(res);

  // Set content type
  res.set("Content-Type", result.contentType);

  // Set content length for better streaming
  res.set("Content-Length", result.buffer.length);

  // Add custom headers for debugging/analytics
  res.set("X-Countdown-Id", result.metadata.countdownId);
  res.set("X-Countdown-Expired", result.metadata.isExpired.toString());
  res.set("X-Countdown-Format", result.metadata.format);
  res.set("X-Generated-At", result.metadata.generatedAt);

  if (result.metadata.frameCount) {
    res.set("X-Gif-Frames", result.metadata.frameCount.toString());
  }

  // Increment view count asynchronously (non-blocking)
  if (result.metadata.ownerId) {
    renderService
      .incrementViewCount(result.metadata.countdownId, result.metadata.ownerId)
      .catch(() => {}); // Ignore errors
  }

  // Send image buffer
  res.send(result.buffer);
});

/**
 * GET /api/v1/render/:id/embed
 *
 * Returns embed code for the countdown image.
 */
export const getEmbedCode = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Get render stats for metadata
  const stats = await renderService.getRenderStats(id);

  const embedCodes = {
    // Animated GIF for email (recommended)
    gif: {
      html: `<img src="${baseUrl}/api/v1/render/${id}.gif" alt="Countdown Timer" style="max-width: 100%; height: auto;" />`,
      url: `${baseUrl}/api/v1/render/${id}.gif`,
    },
    // Static PNG
    png: {
      html: `<img src="${baseUrl}/api/v1/render/${id}.png" alt="Countdown Timer" style="max-width: 100%; height: auto;" />`,
      url: `${baseUrl}/api/v1/render/${id}.png`,
    },
    // Markdown
    markdown: `![Countdown Timer](${baseUrl}/api/v1/render/${id}.gif)`,
    // BBCode
    bbcode: `[img]${baseUrl}/api/v1/render/${id}.gif[/img]`,
  };

  res.json({
    success: true,
    data: {
      countdown: stats,
      embedCodes,
      recommended: "gif",
      note: "Use GIF format for animated countdown in emails. PNG for static images.",
    },
  });
});

/**
 * POST /api/v1/render/preview
 *
 * Renders a preview image for a style configuration.
 * Requires authentication.
 */
export const renderPreview = asyncHandler(async (req, res) => {
  const { styleConfig, format = "gif" } = req.body;
  const userPlan = req.user?.plan || "FREE";

  // Render preview
  const buffer = await renderService.renderStylePreview(
    styleConfig,
    userPlan,
    format
  );

  // Set headers
  setNoCacheHeaders(res);

  const contentType =
    format === "gif"
      ? "image/gif"
      : format === "jpeg"
      ? "image/jpeg"
      : "image/png";

  res.set("Content-Type", contentType);
  res.set("Content-Length", buffer.length);

  // Send image
  res.send(buffer);
});

/**
 * Sets email-safe no-cache headers.
 *
 * WHY THESE HEADERS:
 * - Prevents email clients from caching stale images
 * - Ensures countdown updates on every view
 * - Maximum compatibility with email clients
 *
 * @param {Response} res - Express response object
 */
const setNoCacheHeaders = (res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
    // Prevent CDN caching
    "CDN-Cache-Control": "no-store",
    // Additional headers for email clients
    "X-Content-Type-Options": "nosniff",
  });
};

export default {
  renderCountdownImage,
  getEmbedCode,
  renderPreview,
};
