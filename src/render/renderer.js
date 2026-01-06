// ===========================================
// Main Countdown Renderer
// ===========================================
// Orchestrates the rendering pipeline for countdown images.
// Uses node-canvas for server-side image generation.
//
// WHY NODE-CANVAS:
// - Fast cold starts (~50ms)
// - Low memory footprint
// - Full text rendering control
// - No browser dependency
// - Production-tested at scale

import { createCanvas, registerFont } from "canvas";
import { calculateRemainingTime, formatTimeSegments } from "./time.utils.js";
import {
  mergeStyleConfig,
  calculateLayout,
  DEFAULT_STYLE,
} from "./layout.engine.js";
import { renderBranding, shouldShowBranding } from "./branding.overlay.js";
import {
  applyExpiredTreatment,
  renderExpiredState,
  getExpiredMessage,
} from "./expired.renderer.js";
import {
  renderAnimatedGif,
  calculateOptimalFrameCount,
  estimateGifSize,
  GIF_CONFIG,
} from "./gif.renderer.js";

/**
 * Font cache for performance.
 * Fonts are loaded once and reused.
 */
const fontCache = new Map();

/**
 * Registers a custom font for use in rendering.
 *
 * @param {string} path - Path to font file
 * @param {string} family - Font family name
 */
export const registerCustomFont = (path, family) => {
  if (!fontCache.has(family)) {
    try {
      registerFont(path, { family });
      fontCache.set(family, true);
    } catch (error) {
      console.warn(`Failed to register font ${family}:`, error.message);
    }
  }
};

/**
 * Renders a countdown image (static or animated).
 *
 * @param {Object} countdown - Countdown data from database
 * @param {Object} options - Rendering options
 * @returns {Promise<Buffer>} Image buffer (PNG, JPEG, or GIF)
 */
export const renderCountdown = async (countdown, options = {}) => {
  const { format = "png", quality = 0.92, userPlan = "FREE" } = options;

  // Route to GIF renderer if requested
  if (format === "gif") {
    return renderAnimatedGif(countdown, {
      frameCount: options.frameCount,
      frameDelay: options.frameDelay,
      quality: options.gifQuality,
      userPlan,
    });
  }

  // Static image rendering (PNG/JPEG)
  return renderStaticImage(countdown, options);
};

/**
 * Renders a static countdown image (PNG or JPEG).
 *
 * @param {Object} countdown - Countdown data
 * @param {Object} options - Rendering options
 * @returns {Promise<Buffer>} Image buffer
 */
const renderStaticImage = async (countdown, options = {}) => {
  const { format = "png", quality = 0.92, userPlan = "FREE" } = options;

  // Calculate remaining time
  const time = calculateRemainingTime(countdown.endAt);
  // Merge style configuration
  let style = mergeStyleConfig(countdown.styleConfig);

  // Determine if branding should show
  const showBranding = shouldShowBranding(userPlan, countdown.styleConfig);
  style.showBranding = showBranding;

  // Apply expired treatment if needed
  const isExpired = time.isExpired;
  if (isExpired) {
    style = applyExpiredTreatment(style);
  }

  // Get time segments to display
  const segments = formatTimeSegments(time, {
    showDays: style.showDays,
    showHours: style.showHours,
    showMinutes: style.showMinutes,
    showSeconds: style.showSeconds,
    labelStyle: style.labelStyle,
  });

  // Calculate layout
  const layout = calculateLayout(style, segments.length);

  // Create canvas
  const canvas = createCanvas(layout.canvas.width, layout.canvas.height);
  const ctx = canvas.getContext("2d");

  // Render background
  renderBackground(ctx, layout, style);

  // Render content based on state
  if (isExpired) {
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
  } else {
    renderTimeSegments(ctx, layout, style, segments);
  }

  // Render branding if needed
  if (showBranding) {
    renderBranding(ctx, layout);
  }

  // Export to buffer
  if (format === "jpeg" || format === "jpg") {
    return canvas.toBuffer("image/jpeg", { quality });
  }

  return canvas.toBuffer("image/png");
};

/**
 * Renders the background.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions
 * @param {Object} style - Style configuration
 */
const renderBackground = (ctx, layout, style) => {
  const { width, height } = layout.canvas;
  const { backgroundColor, borderRadius } = style;

  // Simple fill (gradient support can be added later)
  ctx.fillStyle = backgroundColor;

  if (borderRadius > 0) {
    // Rounded rectangle
    roundRect(ctx, 0, 0, width, height, borderRadius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, width, height);
  }
};

/**
 * Renders time segments on canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions
 * @param {Object} style - Style configuration
 * @param {Array} segments - Time segments to render
 */
const renderTimeSegments = (ctx, layout, style, segments) => {
  const {
    fontFamily,
    fontSize,
    fontColor,
    labelFontSize,
    labelColor,
    showLabels,
    showSeparators,
    separatorChar,
    accentColor,
  } = style;

  // Render each segment
  segments.forEach((segment, index) => {
    const pos = layout.segments[index];
    if (!pos) return;

    // Draw value
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(segment.value, pos.x, pos.valueY);

    // Draw label if enabled
    if (showLabels && segment.label && !pos.compact) {
      ctx.font = `${labelFontSize || 14}px ${fontFamily}`;
      ctx.fillStyle = labelColor || "rgba(255,255,255,0.6)";
      ctx.fillText(segment.label, pos.x, pos.labelY);
    }
  });

  // Render separators
  if (showSeparators && layout.separators) {
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = accentColor || fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    layout.separators.forEach((sep) => {
      ctx.fillText(separatorChar || ":", sep.x, sep.y);
    });
  }
};

/**
 * Draws a rounded rectangle path.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {number} radius - Corner radius
 */
const roundRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

/**
 * Generates a preview image for a style configuration.
 * Used for style editor preview without saving.
 *
 * @param {Object} styleConfig - Style configuration to preview
 * @param {Object} options - Preview options
 * @returns {Promise<Buffer>} Image buffer
 */
export const renderPreview = async (styleConfig, options = {}) => {
  const { format = "png", userPlan = "PRO" } = options;

  // Create mock countdown for preview
  const mockCountdown = {
    endAt: new Date(Date.now() + 90061000), // 1 day, 1 hour, 1 minute, 1 second
    timezone: "UTC",
    styleConfig,
  };

  return renderCountdown(mockCountdown, { format, userPlan });
};

/**
 * Gets the dimensions for a rendered countdown.
 * Useful for responsive embedding.
 *
 * @param {Object} styleConfig - Style configuration
 * @returns {Object} Width and height
 */
export const getRenderedDimensions = (styleConfig) => {
  const style = mergeStyleConfig(styleConfig);
  return {
    width: style.width || DEFAULT_STYLE.width,
    height: style.height || DEFAULT_STYLE.height,
  };
};

// Re-export GIF utilities
export { calculateOptimalFrameCount, estimateGifSize, GIF_CONFIG };

export default {
  renderCountdown,
  renderPreview,
  getRenderedDimensions,
  registerCustomFont,
  calculateOptimalFrameCount,
  estimateGifSize,
};
