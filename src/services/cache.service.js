// ===========================================
// Cache Service
// ===========================================
// Provides cache invalidation operations for render outputs.
// Abstracts Redis operations from business logic.
//
// WHY SERVICE LAYER:
// - Keeps Redis calls out of controllers
// - Centralizes cache invalidation logic
// - Graceful degradation if Redis unavailable
// - Pattern-based invalidation (not global flush)

import { getRedis } from '../lib/redis.js';
import { getRenderCachePattern } from '../utils/cacheKey.js';

/**
 * Invalidates all cached renders for a specific countdown.
 * Uses pattern matching to delete all format/dimension variations.
 *
 * WHY PATTERN-BASED:
 * - A countdown can have multiple cached renders (gif, png, different sizes)
 * - Deleting by pattern ensures all variations are cleared
 * - More surgical than global flush
 *
 * @param {string} countdownId - Countdown ID to invalidate
 * @returns {Promise<{ success: boolean, deletedCount: number }>}
 *
 * @example
 * await invalidateCountdownCache('abc123');
 * // Deletes: render:abc123:gif:*, render:abc123:png:*, etc.
 */
export const invalidateCountdownCache = async (countdownId) => {
  if (!countdownId) {
    return { success: false, deletedCount: 0 };
  }

  try {
    const redis = await getRedis();
    if (!redis) {
      // Redis not available - skip silently
      return { success: true, deletedCount: 0 };
    }

    // Pattern to match all renders for this countdown
    const pattern = `render:${countdownId}:*`;

    // Use SCAN to find keys (safer than KEYS for large datasets)
    const keysToDelete = [];
    let cursor = '0';

    do {
      const [nextCursor, keys] = await redis.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        100,
      );
      cursor = nextCursor;
      keysToDelete.push(...keys);
    } while (cursor !== '0');

    if (keysToDelete.length === 0) {
      console.log(
        `[CacheService] No cached renders found for countdown ${countdownId}`,
      );
      return { success: true, deletedCount: 0 };
    }

    // Delete all matching keys
    const deletedCount = await redis.del(...keysToDelete);

    console.log(
      `[CacheService] Invalidated ${deletedCount} cached renders for countdown ${countdownId}`,
    );

    return { success: true, deletedCount };
  } catch (err) {
    // Log but don't throw - cache invalidation failure shouldn't break business logic
    console.error(
      `[CacheService] Error invalidating cache for ${countdownId}:`,
      err.message,
    );
    return { success: false, deletedCount: 0 };
  }
};

/**
 * Invalidates cache for multiple countdowns.
 * Useful for bulk operations.
 *
 * @param {string[]} countdownIds - Array of countdown IDs
 * @returns {Promise<{ success: boolean, totalDeleted: number }>}
 */
export const invalidateMultipleCountdownCaches = async (countdownIds) => {
  if (!countdownIds || countdownIds.length === 0) {
    return { success: true, totalDeleted: 0 };
  }

  let totalDeleted = 0;
  let allSuccess = true;

  for (const countdownId of countdownIds) {
    const result = await invalidateCountdownCache(countdownId);
    totalDeleted += result.deletedCount;
    if (!result.success) allSuccess = false;
  }

  return { success: allSuccess, totalDeleted };
};

/**
 * Invalidates cache when countdown config changes.
 * Called by countdown service on update.
 *
 * @param {string} countdownId - Countdown ID
 * @param {Object} changes - Object with changed fields
 * @returns {Promise<void>}
 */
export const onCountdownConfigChanged = async (countdownId, changes = {}) => {
  // Fields that affect rendered output
  const renderAffectingFields = [
    'title',
    'endAt',
    'timezone',
    'styleConfig',
    'status',
  ];

  // Check if any render-affecting field changed
  const hasRenderChange = Object.keys(changes).some((key) =>
    renderAffectingFields.includes(key),
  );

  if (hasRenderChange) {
    await invalidateCountdownCache(countdownId);
  }
};

/**
 * Invalidates cache when countdown is deleted.
 *
 * @param {string} countdownId - Countdown ID
 * @returns {Promise<void>}
 */
export const onCountdownDeleted = async (countdownId) => {
  await invalidateCountdownCache(countdownId);
};

export default {
  invalidateCountdownCache,
  invalidateMultipleCountdownCaches,
  onCountdownConfigChanged,
  onCountdownDeleted,
};
