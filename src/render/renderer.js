// ===========================================
// Main Countdown Renderer
// ===========================================
// Orchestrates the rendering pipeline for countdown images.
// Supports multiple design variants.

import { createCanvas, registerFont } from "canvas";
import { calculateRemainingTime, formatTimeSegments } from "./time.utils.js";
import {
  mergeStyleConfig,
  calculateLayout,
  darkenColor,
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
import { DESIGN_VARIANTS } from "../config/styles.js";

/**
 * Font cache for performance.
 */
const fontCache = new Map();

/**
 * Registers a custom font for use in rendering.
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
 */
export const renderCountdown = async (countdown, options = {}) => {
  const { format = "png", quality = 0.92, userPlan = "FREE" } = options;

  if (format === "gif") {
    return renderAnimatedGif(countdown, {
      frameCount: options.frameCount,
      frameDelay: options.frameDelay,
      quality: options.gifQuality,
      userPlan,
    });
  }

  return renderStaticImage(countdown, options);
};

/**
 * Renders a static countdown image (PNG or JPEG).
 */
const renderStaticImage = async (countdown, options = {}) => {
  const { format = "png", quality = 0.92, userPlan = "FREE" } = options;

  const time = calculateRemainingTime(countdown.endAt);

  // Normalize style config with defaults
  let style = mergeStyleConfig(countdown.styleConfig);

  // Determine branding based on plan
  const showBranding = shouldShowBranding(userPlan, countdown.styleConfig);
  style.showBranding = showBranding;

  // Apply expired treatment if needed
  const isExpired = time.isExpired;
  if (isExpired) {
    style = applyExpiredTreatmentForDesign(style);
  }

  // Get time segments
  const segments = formatTimeSegments(time, {
    showDays: style.showDays,
    showHours: style.showHours,
    showMinutes: style.showMinutes,
    showSeconds: style.showSeconds,
    labelStyle: style.labelStyle,
  });

  // Calculate layout based on design
  const layout = calculateLayout(style, segments.length);

  // Create canvas
  const canvas = createCanvas(layout.canvas.width, layout.canvas.height);
  const ctx = canvas.getContext("2d");

  // Render based on design variant
  renderDesign(ctx, layout, style, segments, isExpired, countdown);

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
 * Renders the countdown based on design variant.
 */
const renderDesign = (ctx, layout, style, segments, isExpired, countdown) => {
  // Render backdrop first (unless noBackdrop)
  renderBackdrop(ctx, layout, style);

  // Render design-specific elements
  switch (layout.design) {
    case DESIGN_VARIANTS.CIRCLE:
      renderCircleDesign(ctx, layout, style, segments, isExpired, countdown);
      break;
    case DESIGN_VARIANTS.MINIMAL:
      renderMinimalDesign(ctx, layout, style, segments, isExpired, countdown);
      break;
    case DESIGN_VARIANTS.PILL:
      renderPillDesign(ctx, layout, style, segments, isExpired, countdown);
      break;
    case DESIGN_VARIANTS.BLOCK:
    default:
      renderBlockDesign(ctx, layout, style, segments, isExpired, countdown);
      break;
  }
};

/**
 * Renders the backdrop/background.
 */
const renderBackdrop = (ctx, layout, style) => {
  const { width, height } = layout.canvas;

  if (style.noBackdrop) {
    // Transparent background
    ctx.clearRect(0, 0, width, height);
  } else {
    ctx.fillStyle = style.colors?.backdrop || "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }
};

/**
 * Renders BLOCK design.
 */
const renderBlockDesign = (
  ctx,
  layout,
  style,
  segments,
  isExpired,
  countdown
) => {
  const { fontSize, unitSize } = layout.dimensions;
  const colors = style.colors || {};

  if (isExpired) {
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
    return;
  }

  // Draw each block
  segments.forEach((segment, index) => {
    const pos = layout.segments[index];
    if (!pos) return;

    // Draw block background
    ctx.fillStyle = colors.design || "#000000";
    roundRect(ctx, pos.unitX, pos.unitY, unitSize, unitSize, 8);
    ctx.fill();

    // Draw value
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = colors.text || "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(segment.value, pos.x, pos.valueY);

    // Draw label
    if (style.showLabels && segment.label) {
      ctx.font = `${layout.dimensions.labelFontSize}px Arial`;
      ctx.fillStyle = colors.design || "#000000";
      ctx.fillText(segment.label, pos.x, pos.labelY);
    }
  });

  // Draw separators
  renderSeparators(ctx, layout, style, colors);
};

/**
 * Renders CIRCLE design.
 */
const renderCircleDesign = (
  ctx,
  layout,
  style,
  segments,
  isExpired,
  countdown
) => {
  const { fontSize } = layout.dimensions;
  const colors = style.colors || {};

  if (isExpired) {
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
    return;
  }

  // Draw each circle
  segments.forEach((segment, index) => {
    const pos = layout.segments[index];
    if (!pos) return;

    // Draw circle background
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pos.radius, 0, Math.PI * 2);
    ctx.fillStyle = colors.design || "#000000";
    ctx.fill();

    // Draw value
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = colors.text || "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(segment.value, pos.x, pos.valueY);

    // Draw label below circle
    if (style.showLabels && segment.label) {
      ctx.font = `${layout.dimensions.labelFontSize}px Arial`;
      ctx.fillStyle = colors.design || "#000000";
      ctx.fillText(segment.label, pos.x, pos.labelY);
    }
  });
};

/**
 * Renders MINIMAL design.
 */
const renderMinimalDesign = (
  ctx,
  layout,
  style,
  segments,
  isExpired,
  countdown
) => {
  const { fontSize, labelFontSize } = layout.dimensions;
  const colors = style.colors || {};

  if (isExpired) {
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
    return;
  }

  // Draw each segment (just text, no background shapes)
  segments.forEach((segment, index) => {
    const pos = layout.segments[index];
    if (!pos) return;

    // Draw value
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = colors.design || "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(segment.value, pos.x, pos.valueY);

    // Draw label
    if (style.showLabels && segment.label) {
      ctx.font = `${labelFontSize}px Arial`;
      ctx.fillStyle = colors.text || "#666666";
      ctx.fillText(segment.label, pos.x, pos.labelY);
    }
  });

  // Draw separators
  renderSeparators(ctx, layout, style, colors);
};

/**
 * Renders PILL design.
 */
const renderPillDesign = (
  ctx,
  layout,
  style,
  segments,
  isExpired,
  countdown
) => {
  const { fontSize, borderRadius } = layout.dimensions;
  const colors = style.colors || {};
  const pill = layout.pill;

  if (isExpired) {
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
    return;
  }

  // Draw pill background
  ctx.fillStyle = colors.design || "#000000";
  roundRect(ctx, pill.x, pill.y, pill.width, pill.height, borderRadius);
  ctx.fill();

  // Draw each segment value
  segments.forEach((segment, index) => {
    const pos = layout.segments[index];
    if (!pos) return;

    // Draw value
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = colors.text || "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(segment.value, pos.x, pos.valueY);
  });

  // Draw vertical separators
  if (layout.separators) {
    ctx.strokeStyle = colors.text || "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    layout.separators.forEach((sep) => {
      ctx.beginPath();
      ctx.moveTo(sep.x, sep.y1);
      ctx.lineTo(sep.x, sep.y2);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }
};

/**
 * Renders separators between segments.
 */
const renderSeparators = (ctx, layout, style, colors) => {
  if (!style.showSeparators || !layout.separators) return;

  const separatorChar = style.separatorChar || ":";

  layout.separators.forEach((sep) => {
    if (sep.vertical) {
      // Vertical line separator (for pill)
      ctx.strokeStyle = colors.text || "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sep.x, sep.y1);
      ctx.lineTo(sep.x, sep.y2);
      ctx.stroke();
    } else {
      // Text separator
      ctx.font = `bold ${sep.fontSize}px Arial`;
      ctx.fillStyle = colors.design || "#000000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(separatorChar, sep.x, sep.y);
    }
  });
};

/**
 * Applies expired treatment based on design colors.
 */
const applyExpiredTreatmentForDesign = (style) => {
  return {
    ...style,
    colors: {
      design: darkenColor(style.colors?.design || "#000000", 0.4),
      text: darkenColor(style.colors?.text || "#FFFFFF", 0.3),
      backdrop: style.colors?.backdrop || "#FFFFFF",
    },
  };
};

/**
 * Draws a rounded rectangle.
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
 */
export const renderPreview = async (styleConfig, options = {}) => {
  const { format = "png", userPlan = "PRO" } = options;

  const mockCountdown = {
    endAt: new Date(Date.now() + 90061000),
    timezone: "UTC",
    styleConfig,
  };

  return renderCountdown(mockCountdown, { format, userPlan });
};

/**
 * Gets the dimensions for a rendered countdown.
 */
export const getRenderedDimensions = (styleConfig) => {
  const style = mergeStyleConfig(styleConfig);
  const layout = calculateLayout(style, 4);
  return {
    width: layout.canvas.width,
    height: layout.canvas.height,
  };
};

export { calculateOptimalFrameCount, estimateGifSize, GIF_CONFIG };

export default {
  renderCountdown,
  renderPreview,
  getRenderedDimensions,
  registerCustomFont,
  calculateOptimalFrameCount,
  estimateGifSize,
};
