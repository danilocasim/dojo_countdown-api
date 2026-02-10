// ===========================================
// Animation Engine
// ===========================================
// Computes lightweight per-frame transforms for GIF animation.
// Completely isolated from core rendering logic.
//
// DESIGN:
// - Pure functions: no canvas mutation, just math
// - Returns transform objects consumed by the GIF renderer
// - Static renders skip this module entirely
// - All effects use simple Canvas operations (alpha, scale, translate)
//   to stay performance-safe (no per-pixel work)

import {
  ANIMATION_TYPES,
  ANIMATION_PRESETS,
  ANIMATION_DURATION_LIMITS,
} from '../config/animations.js';

/**
 * Identity transform returned when no animation is active.
 */
const IDENTITY_TRANSFORM = {
  alpha: 1.0,
  scaleX: 1.0,
  scaleY: 1.0,
  translateX: 0,
  translateY: 0,
};

/**
 * Computes the animation transform for a given frame.
 *
 * @param {Object} animConfig - Animation config from normalized styleConfig
 * @param {string} animConfig.type - Animation type
 * @param {number} animConfig.durationMs - Cycle duration in ms
 * @param {number} frameIndex - Current frame index (0-based)
 * @param {number} frameDelayMs - Delay between frames in ms (typically 1000)
 * @returns {Object} Transform with { alpha, scaleX, scaleY, translateX, translateY }
 */
export const getFrameTransform = (
  animConfig,
  frameIndex,
  frameDelayMs = 1000,
) => {
  if (!animConfig || animConfig.type === ANIMATION_TYPES.NONE) {
    return IDENTITY_TRANSFORM;
  }

  const durationMs = animConfig.durationMs || ANIMATION_DURATION_LIMITS.default;
  // Current time position within the animation cycle
  const frameTimeMs = frameIndex * frameDelayMs;
  // Normalized progress through one cycle [0, 1)
  const progress = (frameTimeMs % durationMs) / durationMs;
  // Sinusoidal ease: smooth 0→1→0 over one cycle
  const ease = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;

  switch (animConfig.type) {
    case ANIMATION_TYPES.FADE:
      return computeFadeTransform(ease);
    case ANIMATION_TYPES.PULSE:
      return computePulseTransform(ease);
    case ANIMATION_TYPES.SLIDE:
      return computeSlideTransform(ease);
    default:
      return IDENTITY_TRANSFORM;
  }
};

/**
 * Fade: oscillates globalAlpha between minAlpha and 1.0.
 */
const computeFadeTransform = (ease) => {
  const preset = ANIMATION_PRESETS[ANIMATION_TYPES.FADE];
  const alpha = preset.minAlpha + (preset.maxAlpha - preset.minAlpha) * ease;
  return { ...IDENTITY_TRANSFORM, alpha };
};

/**
 * Pulse: oscillates scale between minScale and maxScale uniformly.
 */
const computePulseTransform = (ease) => {
  const preset = ANIMATION_PRESETS[ANIMATION_TYPES.PULSE];
  const scale = preset.minScale + (preset.maxScale - preset.minScale) * ease;
  return { ...IDENTITY_TRANSFORM, scaleX: scale, scaleY: scale };
};

/**
 * Slide: oscillates a small vertical translate up and down.
 */
const computeSlideTransform = (ease) => {
  const preset = ANIMATION_PRESETS[ANIMATION_TYPES.SLIDE];
  // Map ease [0,1] to [-offset, +offset]
  const translateY = (ease * 2 - 1) * preset.offsetPixels;
  return { ...IDENTITY_TRANSFORM, translateY };
};

/**
 * Applies the computed transform to a Canvas 2D context BEFORE
 * rendering frame content. Call applyAnimationPost() after rendering.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout with canvas dimensions
 * @param {Object} transform - Transform from getFrameTransform()
 */
export const applyAnimationPre = (ctx, layout, transform) => {
  if (
    transform === IDENTITY_TRANSFORM ||
    (transform.alpha === 1.0 &&
      transform.scaleX === 1.0 &&
      transform.scaleY === 1.0 &&
      transform.translateX === 0 &&
      transform.translateY === 0)
  ) {
    // No-op for identity; still save so applyAnimationPost is balanced
    ctx.save();
    return;
  }

  ctx.save();

  // Apply alpha
  if (transform.alpha !== 1.0) {
    ctx.globalAlpha *= transform.alpha;
  }

  // Apply scale around canvas center + translate
  const cx = layout.canvas.width / 2;
  const cy = layout.canvas.height / 2;

  ctx.translate(cx + transform.translateX, cy + transform.translateY);
  ctx.scale(transform.scaleX, transform.scaleY);
  ctx.translate(-cx, -cy);
};

/**
 * Restores the canvas context after animation transforms.
 * Must be called once for every applyAnimationPre() call.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export const applyAnimationPost = (ctx) => {
  ctx.restore();
};

/**
 * Returns true if the animation config represents an active animation.
 *
 * @param {Object} animConfig - Animation config object
 * @returns {boolean}
 */
export const isAnimationActive = (animConfig) => {
  return (
    animConfig &&
    typeof animConfig === 'object' &&
    animConfig.type !== ANIMATION_TYPES.NONE
  );
};

export default {
  getFrameTransform,
  applyAnimationPre,
  applyAnimationPost,
  isAnimationActive,
};
