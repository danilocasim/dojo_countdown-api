// ===========================================
// Cache TTL Strategy
// ===========================================
// Determines appropriate TTL for cached render outputs
// based on countdown state.
//
// WHY DIFFERENT TTLs:
// - Active countdowns change every second → short TTL
// - Expired countdowns are static → long TTL (save resources)
// - Near-expiry countdowns need accuracy → very short TTL
//
// WHY ISOLATED:
// - Single source of truth for TTL logic
// - Easy to tune without touching render code
// - Testable in isolation

/**
 * TTL configuration in seconds.
 * Adjust these values based on traffic patterns and accuracy needs.
 */
export const TTL_CONFIG = {
  // Countdown is expired (static image, never changes)
  EXPIRED: 3600, // 1 hour

  // Countdown expires within 1 minute (high accuracy needed)
  NEAR_EXPIRY: 1, // 1 second

  // Countdown expires within 5 minutes
  EXPIRING_SOON: 3, // 3 seconds

  // Countdown expires within 1 hour
  EXPIRING_HOUR: 5, // 5 seconds

  // Countdown has more than 1 hour remaining
  ACTIVE: 10, // 10 seconds

  // Default fallback
  DEFAULT: 5, // 5 seconds
};

/**
 * Calculates the appropriate cache TTL for a countdown render.
 *
 * Strategy:
 * - Expired → Long TTL (image won't change)
 * - Near expiry (<1 min) → Very short TTL (accuracy critical)
 * - Expiring soon (<5 min) → Short TTL
 * - Expiring within hour → Medium TTL
 * - Active (>1 hour) → Longer TTL (less urgency)
 *
 * @param {Object} options - TTL calculation options
 * @param {boolean} options.isExpired - Whether the countdown has expired
 * @param {number} options.remainingMs - Milliseconds until expiry (0 if expired)
 * @returns {number} TTL in seconds
 *
 * @example
 * // Expired countdown
 * getRenderCacheTtl({ isExpired: true, remainingMs: 0 });
 * // Returns: 3600 (1 hour)
 *
 * @example
 * // Countdown expiring in 30 seconds
 * getRenderCacheTtl({ isExpired: false, remainingMs: 30000 });
 * // Returns: 1 (1 second)
 *
 * @example
 * // Countdown expiring in 2 hours
 * getRenderCacheTtl({ isExpired: false, remainingMs: 7200000 });
 * // Returns: 10 (10 seconds)
 */
export const getRenderCacheTtl = ({ isExpired, remainingMs }) => {
  // Expired countdowns are static - cache for a long time
  if (isExpired || remainingMs <= 0) {
    return TTL_CONFIG.EXPIRED;
  }

  const remainingSeconds = Math.floor(remainingMs / 1000);
  const remainingMinutes = remainingSeconds / 60;

  // Within 1 minute - maximum accuracy
  if (remainingMinutes < 1) {
    return TTL_CONFIG.NEAR_EXPIRY;
  }

  // Within 5 minutes - high accuracy
  if (remainingMinutes < 5) {
    return TTL_CONFIG.EXPIRING_SOON;
  }

  // Within 1 hour - moderate accuracy
  if (remainingMinutes < 60) {
    return TTL_CONFIG.EXPIRING_HOUR;
  }

  // More than 1 hour - standard caching
  return TTL_CONFIG.ACTIVE;
};

/**
 * Calculates TTL from an end date directly.
 * Convenience wrapper when you have the endAt timestamp.
 *
 * @param {Date|string|number} endAt - Countdown end time
 * @returns {number} TTL in seconds
 *
 * @example
 * getRenderCacheTtlFromEndAt(new Date('2026-12-31T23:59:59Z'));
 */
export const getRenderCacheTtlFromEndAt = (endAt) => {
  const endTime = new Date(endAt).getTime();
  const now = Date.now();
  const remainingMs = endTime - now;
  const isExpired = remainingMs <= 0;

  return getRenderCacheTtl({ isExpired, remainingMs });
};

/**
 * Gets TTL description for logging/debugging.
 *
 * @param {number} ttl - TTL in seconds
 * @returns {string} Human-readable TTL category
 *
 * @example
 * getTtlCategory(3600); // Returns: 'expired'
 * getTtlCategory(1);    // Returns: 'near-expiry'
 */
export const getTtlCategory = (ttl) => {
  if (ttl >= TTL_CONFIG.EXPIRED) return 'expired';
  if (ttl <= TTL_CONFIG.NEAR_EXPIRY) return 'near-expiry';
  if (ttl <= TTL_CONFIG.EXPIRING_SOON) return 'expiring-soon';
  if (ttl <= TTL_CONFIG.EXPIRING_HOUR) return 'expiring-hour';
  return 'active';
};

export default {
  TTL_CONFIG,
  getRenderCacheTtl,
  getRenderCacheTtlFromEndAt,
  getTtlCategory,
};
