// ===========================================
// Cache Key Generator
// ===========================================
// Generates stable, deterministic cache keys for rendered
// countdown outputs. Used for Redis caching of GIF/PNG renders.
//
// WHY THIS DESIGN:
// - Pure function: no side effects, no external calls
// - Deterministic: same inputs always produce same key
// - Order-independent: object key order doesn't affect hash
// - Compact: MD5 produces short, URL-safe keys

import { createHash } from 'crypto';

/**
 * Recursively sorts object keys to ensure order-independent serialization.
 * Handles nested objects and arrays.
 *
 * @param {*} value - Any value to normalize
 * @returns {*} Normalized value with sorted keys
 */
const sortObjectKeys = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (typeof value === 'object') {
    const sorted = {};
    const keys = Object.keys(value).sort();
    for (const key of keys) {
      sorted[key] = sortObjectKeys(value[key]);
    }
    return sorted;
  }

  return value;
};

/**
 * Creates a stable string representation of any value.
 * Objects are serialized with sorted keys for consistency.
 *
 * @param {*} value - Value to serialize
 * @returns {string} Stable string representation
 */
const stableStringify = (value) => {
  return JSON.stringify(sortObjectKeys(value));
};

/**
 * Generates an MD5 hash of a string.
 * MD5 is fast and sufficient for cache keys (not security-critical).
 *
 * @param {string} input - String to hash
 * @returns {string} Hex-encoded MD5 hash
 */
const md5Hash = (input) => {
  return createHash('md5').update(input).digest('hex');
};

/**
 * Generates a stable, deterministic cache key for a rendered countdown.
 *
 * The key incorporates all factors that affect the rendered output:
 * - countdownId: Which countdown is being rendered
 * - styleConfig: Visual styling (colors, fonts, layout, etc.)
 * - format: Output format (gif, png, svg)
 * - dimensions: Width and height of the output
 * - showBranding: Whether branding overlay is included
 *
 * IMPORTANT:
 * - This function is PURE: no side effects, no external calls
 * - This function is DETERMINISTIC: same inputs → same output
 * - Object properties are sorted before hashing for order-independence
 *
 * @param {Object} params - Cache key parameters
 * @param {string} params.countdownId - Unique countdown identifier
 * @param {Object} params.styleConfig - Style configuration object
 * @param {string} params.format - Render format ('gif', 'png', 'svg')
 * @param {Object} params.dimensions - Output dimensions
 * @param {number} params.dimensions.width - Width in pixels
 * @param {number} params.dimensions.height - Height in pixels
 * @param {boolean} params.showBranding - Whether branding is shown
 * @returns {string} Stable cache key (format: "render:{countdownId}:{hash}")
 *
 * @example
 * const key = generateRenderCacheKey({
 *   countdownId: 'abc123',
 *   styleConfig: { fontColor: '#FFFFFF', fontSize: 48 },
 *   format: 'gif',
 *   dimensions: { width: 600, height: 200 },
 *   showBranding: true,
 * });
 * // Returns: "render:abc123:a1b2c3d4e5f6..."
 */
export const generateRenderCacheKey = ({
  countdownId,
  styleConfig,
  format,
  dimensions,
  showBranding,
}) => {
  // Validate required inputs
  if (!countdownId || typeof countdownId !== 'string') {
    throw new Error('countdownId is required and must be a string');
  }

  if (!format || typeof format !== 'string') {
    throw new Error('format is required and must be a string');
  }

  // Normalize inputs for hashing
  const normalizedFormat = format.toLowerCase();
  const normalizedDimensions = {
    width: dimensions?.width || 600,
    height: dimensions?.height || 200,
  };
  const normalizedBranding = Boolean(showBranding);
  const normalizedStyle = styleConfig || {};

  // Build the payload to hash
  // Order of properties doesn't matter - stableStringify sorts them
  const payload = {
    style: normalizedStyle,
    format: normalizedFormat,
    dimensions: normalizedDimensions,
    branding: normalizedBranding,
  };

  // Create stable hash of the payload
  const payloadHash = md5Hash(stableStringify(payload));

  // Prefix with countdown ID for easy identification and potential key scanning
  return `render:${countdownId}:${payloadHash}`;
};

/**
 * Parses a render cache key to extract the countdown ID.
 * Useful for cache invalidation by countdown.
 *
 * @param {string} cacheKey - Cache key to parse
 * @returns {string|null} Countdown ID or null if invalid key format
 *
 * @example
 * const id = parseRenderCacheKey('render:abc123:hash...');
 * // Returns: 'abc123'
 */
export const parseRenderCacheKey = (cacheKey) => {
  if (!cacheKey || typeof cacheKey !== 'string') {
    return null;
  }

  const parts = cacheKey.split(':');
  if (parts.length !== 3 || parts[0] !== 'render') {
    return null;
  }

  return parts[1];
};

/**
 * Generates a cache key pattern for all renders of a specific countdown.
 * Useful for bulk invalidation when a countdown is updated.
 *
 * @param {string} countdownId - Countdown ID
 * @returns {string} Redis key pattern (e.g., "render:abc123:*")
 *
 * @example
 * const pattern = getRenderCachePattern('abc123');
 * // Returns: 'render:abc123:*'
 * // Use with: redis.keys(pattern) or redis.scan()
 */
export const getRenderCachePattern = (countdownId) => {
  if (!countdownId || typeof countdownId !== 'string') {
    throw new Error('countdownId is required and must be a string');
  }

  return `render:${countdownId}:*`;
};

export default {
  generateRenderCacheKey,
  parseRenderCacheKey,
  getRenderCachePattern,
};
