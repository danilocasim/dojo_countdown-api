// ===========================================
// Animation Configuration
// ===========================================
// Defines lightweight animation presets for countdown GIFs.
// Animations are CSS-inspired effects applied per-frame
// during GIF rendering, isolated from core render logic.
//
// PERFORMANCE NOTES:
// - All effects use simple Canvas transforms (alpha, scale, translate)
// - No per-pixel manipulation or CPU-heavy compositing
// - Static renders (PNG/JPEG) ignore animation config entirely
// - Animation config is included in cache key hash via styleConfig

/**
 * Available animation types.
 */
export const ANIMATION_TYPES = {
  NONE: 'none',
  FADE: 'fade',
  PULSE: 'pulse',
  SLIDE: 'slide',
};

/**
 * List of valid animation type values for validation.
 */
export const VALID_ANIMATION_TYPES = Object.values(ANIMATION_TYPES);

/**
 * Animation preset definitions.
 * Each preset defines the parameters for its visual effect.
 */
export const ANIMATION_PRESETS = {
  [ANIMATION_TYPES.NONE]: {
    id: 'none',
    name: 'None',
    description: 'No animation effect',
    defaultDurationMs: 0,
  },
  [ANIMATION_TYPES.FADE]: {
    id: 'fade',
    name: 'Fade',
    description: 'Smooth opacity pulse on countdown elements',
    defaultDurationMs: 2000,
    minAlpha: 0.4,
    maxAlpha: 1.0,
  },
  [ANIMATION_TYPES.PULSE]: {
    id: 'pulse',
    name: 'Pulse',
    description: 'Gentle scale pulse on countdown elements',
    defaultDurationMs: 2000,
    minScale: 0.95,
    maxScale: 1.05,
  },
  [ANIMATION_TYPES.SLIDE]: {
    id: 'slide',
    name: 'Slide',
    description: 'Vertical slide transition on digit changes',
    defaultDurationMs: 1000,
    offsetPixels: 10,
  },
};

/**
 * Duration constraints for animation.
 */
export const ANIMATION_DURATION_LIMITS = {
  min: 500,
  max: 5000,
  default: 2000,
};

/**
 * Default animation configuration.
 */
export const DEFAULT_ANIMATION = {
  type: ANIMATION_TYPES.NONE,
  durationMs: ANIMATION_DURATION_LIMITS.default,
};

export default {
  ANIMATION_TYPES,
  VALID_ANIMATION_TYPES,
  ANIMATION_PRESETS,
  ANIMATION_DURATION_LIMITS,
  DEFAULT_ANIMATION,
};
