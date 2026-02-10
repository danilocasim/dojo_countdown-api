// ===========================================
// Redis-Backed Rate Limit Store
// ===========================================
// Custom store for express-rate-limit that uses Redis
// for distributed rate limiting across multiple instances.
//
// WHY CUSTOM (no new dependency):
// - Uses the existing ioredis client from lib/redis.js
// - Implements the express-rate-limit v7 Store interface
// - Falls back gracefully if Redis is unavailable
//   (passes through — does not block requests)
//
// INTERFACE CONTRACT (express-rate-limit v7):
//   increment(key) → { totalHits: number, resetTime: Date }
//   decrement(key) → void
//   resetKey(key)  → void

import { getRedis } from './redis.js';

/**
 * Creates a Redis-backed store for express-rate-limit.
 *
 * @param {Object} options
 * @param {string} [options.prefix='rl:'] - Redis key prefix
 * @returns {Object} Store compatible with express-rate-limit v7
 */
export const createRedisRateLimitStore = (options = {}) => {
  const prefix = options.prefix || 'rl:';
  let windowMs = 60_000; // default, overridden by init()

  return {
    /**
     * Called by express-rate-limit with limiter options.
     */
    init(limiterOptions) {
      windowMs = limiterOptions.windowMs;
    },

    /**
     * Increments the hit counter for a key.
     * Returns current total hits and reset time.
     * Falls back to permissive response if Redis unavailable.
     */
    async increment(key) {
      try {
        const redis = await getRedis();
        if (!redis) {
          // Redis unavailable — permit the request (fail-open)
          return { totalHits: 0, resetTime: undefined };
        }

        const redisKey = `${prefix}${key}`;
        const ttlSeconds = Math.ceil(windowMs / 1000);

        // Atomic increment + TTL via pipeline
        const results = await redis
          .multi()
          .incr(redisKey)
          .pttl(redisKey)
          .exec();

        const totalHits = results[0][1]; // incr result
        const pttl = results[1][1]; // pttl result

        // Set expiry on first hit (pttl returns -1 if no TTL)
        if (pttl < 0) {
          await redis.expire(redisKey, ttlSeconds);
        }

        // Calculate reset time from remaining TTL
        const resetTime =
          pttl > 0
            ? new Date(Date.now() + pttl)
            : new Date(Date.now() + windowMs);

        return { totalHits, resetTime };
      } catch (err) {
        console.error('[RedisRateLimitStore] increment error:', err.message);
        // Fail-open: don't block requests if Redis has issues
        return { totalHits: 0, resetTime: undefined };
      }
    },

    /**
     * Decrements the hit counter (used when skipSuccessfulRequests is true).
     */
    async decrement(key) {
      try {
        const redis = await getRedis();
        if (!redis) return;

        const redisKey = `${prefix}${key}`;
        await redis.decr(redisKey);
      } catch (err) {
        console.error('[RedisRateLimitStore] decrement error:', err.message);
      }
    },

    /**
     * Resets the counter for a key.
     */
    async resetKey(key) {
      try {
        const redis = await getRedis();
        if (!redis) return;

        const redisKey = `${prefix}${key}`;
        await redis.del(redisKey);
      } catch (err) {
        console.error('[RedisRateLimitStore] resetKey error:', err.message);
      }
    },
  };
};

export default createRedisRateLimitStore;
