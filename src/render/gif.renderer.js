// ===========================================
// GIF Animation Renderer
// ===========================================
// Generates animated GIF countdown images that appear to update live.
// Pre-renders frames showing countdown progression.
//
// WHY ANIMATED GIF:
// - Email clients don't execute JavaScript
// - Static images show stale time after caching
// - Animated GIFs loop, showing "live" countdown effect
// - Maximum email client compatibility

import { createCanvas } from "canvas";
import GIFEncoder from "gifencoder";
import { Readable } from "stream";
import { calculateRemainingTime, formatTimeSegments } from "./time.utils.js";
import { mergeStyleConfig, calculateLayout } from "./layout.engine.js";
import { renderBranding, shouldShowBranding } from "./branding.overlay.js";
import {
  applyExpiredTreatment,
  renderExpiredState,
  getExpiredMessage,
} from "./expired.renderer.js";

/**
 * Default GIF configuration.
 */
export const GIF_CONFIG = {
  frameCount: 30, // Number of frames to render (30 = 30 seconds of animation)
  frameDelay: 1000, // Delay between frames in ms (1000 = 1 second)
  repeat: 0, // 0 = loop forever, -1 = no repeat
  quality: 10, // GIF quality (1-20, lower = better quality, larger file)
  maxFrames: 60, // Maximum frames allowed (to limit file size)
};

/**
 * Renders an animated GIF countdown.
 *
 * @param {Object} countdown - Countdown data from database
 * @param {Object} options - Rendering options
 * @returns {Promise<Buffer>} GIF image buffer
 */
export const renderAnimatedGif = async (countdown, options = {}) => {
  const {
    frameCount = GIF_CONFIG.frameCount,
    frameDelay = GIF_CONFIG.frameDelay,
    quality = GIF_CONFIG.quality,
    userPlan = "FREE",
  } = options;

  // Limit frame count to prevent huge files
  const actualFrameCount = Math.min(frameCount, GIF_CONFIG.maxFrames);

  // Merge style configuration
  let style = mergeStyleConfig(countdown.styleConfig);

  // Determine branding
  const showBranding = shouldShowBranding(userPlan, countdown.styleConfig);
  style.showBranding = showBranding;

  // Calculate initial time
  const initialTime = calculateRemainingTime(
    countdown.endAt,
    countdown.timezone
  );

  // If already expired, return single-frame "expired" GIF
  if (initialTime.isExpired) {
    return renderExpiredGif(countdown, style, options);
  }

  // Get segment configuration
  const segmentConfig = {
    showDays: style.showDays,
    showHours: style.showHours,
    showMinutes: style.showMinutes,
    showSeconds: style.showSeconds,
    labelStyle: style.labelStyle,
  };

  // Calculate how many frames we can actually render before expiry
  const secondsRemaining = Math.floor(initialTime.totalMs / 1000);
  const framesToRender = Math.min(actualFrameCount, secondsRemaining + 1);

  // Get segments for layout calculation
  const sampleSegments = formatTimeSegments(initialTime, segmentConfig);
  const layout = calculateLayout(style, sampleSegments.length);

  // Create GIF encoder
  const encoder = new GIFEncoder(layout.canvas.width, layout.canvas.height);

  // Create canvas
  const canvas = createCanvas(layout.canvas.width, layout.canvas.height);
  const ctx = canvas.getContext("2d");

  // Collect frames into buffer
  const chunks = [];

  // Setup encoder
  const stream = encoder.createReadStream();
  stream.on("data", (chunk) => chunks.push(chunk));

  encoder.start();
  encoder.setRepeat(GIF_CONFIG.repeat);
  encoder.setDelay(frameDelay);
  encoder.setQuality(quality);

  // Render each frame
  for (let i = 0; i < framesToRender; i++) {
    // Calculate time for this frame (subtract i seconds from initial)
    const frameTime = calculateTimeForFrame(initialTime, i);

    // Check if this frame is expired
    if (frameTime.isExpired) {
      // Render expired frame
      const expiredStyle = applyExpiredTreatment(style);
      renderFrame(
        ctx,
        layout,
        expiredStyle,
        null,
        true,
        countdown,
        showBranding
      );
    } else {
      // Render countdown frame
      const segments = formatTimeSegments(frameTime, segmentConfig);
      renderFrame(ctx, layout, style, segments, false, countdown, showBranding);
    }

    // Add frame to GIF
    encoder.addFrame(ctx);
  }

  encoder.finish();

  // Wait for stream to complete and return buffer
  return new Promise((resolve) => {
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });
};

/**
 * Calculates time for a specific frame.
 *
 * @param {Object} initialTime - Initial time calculation
 * @param {number} frameIndex - Frame index (0-based)
 * @returns {Object} Time for this frame
 */
const calculateTimeForFrame = (initialTime, frameIndex) => {
  // Subtract frame index seconds from total
  const remainingMs = initialTime.totalMs - frameIndex * 1000;

  if (remainingMs <= 0) {
    return {
      isExpired: true,
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
    };
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const padZero = (n) => String(n).padStart(2, "0");

  return {
    isExpired: false,
    totalMs: remainingMs,
    days,
    hours,
    minutes,
    seconds,
    formatted: {
      days: padZero(days),
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(seconds),
    },
  };
};

/**
 * Renders a single frame to the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions
 * @param {Object} style - Style configuration
 * @param {Array|null} segments - Time segments (null if expired)
 * @param {boolean} isExpired - Whether this is an expired frame
 * @param {Object} countdown - Countdown object
 * @param {boolean} showBranding - Whether to show branding
 */
const renderFrame = (
  ctx,
  layout,
  style,
  segments,
  isExpired,
  countdown,
  showBranding
) => {
  const { width, height } = layout.canvas;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw background
  ctx.fillStyle = style.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  if (isExpired) {
    // Render expired state
    const expiredConfig = getExpiredMessage(countdown);
    renderExpiredState(ctx, layout, style, expiredConfig);
  } else {
    // Render time segments
    renderTimeSegments(ctx, layout, style, segments);
  }

  // Render branding if needed
  if (showBranding) {
    renderBranding(ctx, layout);
  }
};

/**
 * Renders time segments on canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions
 * @param {Object} style - Style configuration
 * @param {Array} segments - Time segments
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
 * Renders a single-frame expired GIF.
 *
 * @param {Object} countdown - Countdown data
 * @param {Object} style - Style configuration
 * @param {Object} options - Rendering options
 * @returns {Promise<Buffer>} GIF buffer
 */
const renderExpiredGif = async (countdown, style, options) => {
  const expiredStyle = applyExpiredTreatment(style);
  const segments = formatTimeSegments(
    {
      isExpired: true,
      formatted: { days: "00", hours: "00", minutes: "00", seconds: "00" },
    },
    {
      showDays: style.showDays,
      showHours: style.showHours,
      showMinutes: style.showMinutes,
      showSeconds: style.showSeconds,
      labelStyle: style.labelStyle,
    }
  );

  const layout = calculateLayout(expiredStyle, segments.length);

  const encoder = new GIFEncoder(layout.canvas.width, layout.canvas.height);
  const canvas = createCanvas(layout.canvas.width, layout.canvas.height);
  const ctx = canvas.getContext("2d");

  const chunks = [];
  const stream = encoder.createReadStream();
  stream.on("data", (chunk) => chunks.push(chunk));

  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(1000);

  // Render single expired frame
  const showBranding = shouldShowBranding(
    options.userPlan || "FREE",
    countdown.styleConfig
  );
  renderFrame(ctx, layout, expiredStyle, null, true, countdown, showBranding);
  encoder.addFrame(ctx);

  encoder.finish();

  return new Promise((resolve) => {
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });
};

/**
 * Calculates optimal frame count based on remaining time.
 * Balances animation length with file size.
 *
 * @param {number} remainingSeconds - Seconds until expiry
 * @returns {number} Recommended frame count
 */
export const calculateOptimalFrameCount = (remainingSeconds) => {
  if (remainingSeconds <= 0) return 1;
  if (remainingSeconds <= 30) return remainingSeconds;
  if (remainingSeconds <= 60) return 30;
  if (remainingSeconds <= 300) return 45; // 5 minutes
  return 60; // Max frames for longer countdowns
};

/**
 * Estimates GIF file size based on configuration.
 *
 * @param {Object} style - Style configuration
 * @param {number} frameCount - Number of frames
 * @returns {Object} Size estimation
 */
export const estimateGifSize = (style, frameCount) => {
  const { width = 600, height = 200 } = style;

  // Rough estimation: ~5KB per frame for 600x200 at quality 10
  const bytesPerFrame = (width * height * 3) / 100; // Compressed estimate
  const estimatedBytes = bytesPerFrame * frameCount;

  return {
    frames: frameCount,
    estimatedKB: Math.round(estimatedBytes / 1024),
    estimatedMB: (estimatedBytes / (1024 * 1024)).toFixed(2),
  };
};

export default {
  renderAnimatedGif,
  calculateOptimalFrameCount,
  estimateGifSize,
  GIF_CONFIG,
};
