// ===========================================
// Abuse Guard Middleware
// ===========================================
// Lightweight abuse detection for public render endpoints.
// Detects cache-busting patterns and excessive unique requests
// without blocking legitimate traffic.
//
// STRATEGY:
// - Track unique render keys per IP in a sliding window
// - Too many unique keys = cache-busting attempt
// - Soft response: force cache, don't hard-block
// - Log abuse signals for observability (no PII)
//
// WHY SOFT PROTECTION:
// - Avoids false positives from CDN revalidation bursts
// - Doesn't degrade UX for legitimate users
// - Provides signals for future alerting/blocking decisions

import { getRedis } from '../lib/redis.js';

/**
 * Configuration (via environment with sane defaults).
 */
const WINDOW_SECONDS = parseInt(process.env.ABUSE_WINDOW_SECONDS || '60', 10);
const MAX_UNIQUE_KEYS = parseInt(
  process.env.ABUSE_MAX_UNIQUE_KEYS || '50',
  10,
);

/**
 * Creates the abuse guard middleware.
 * Tracks unique countdown IDs + format combos per IP.
 *
 * When the threshold is exceeded:
 * - Sets res.locals.forceCache = true (signal for controller)
 * - Logs the abuse signal
 * - Does NOT block the request
 *
 * @returns {Function} Express middleware
 */
export const abuseGuard = () => {
  // In-memory fallback when Redis is unavailable
  const memoryMap = new Map();
  const MEMORY_CLEANUP_INTERVAL = 60_000;

  // Periodic cleanup of in-memory map
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryMap) {
      if (now - entry.windowStart > WINDOW_SECONDS * 1000) {
        memoryMap.delete(key);
      }
    }
  }, MEMORY_CLEANUP_INTERVAL).unref();

  return async (req, res, next) => {
    try {
      // Build the render fingerprint from the request
      const ip = req.ip;
      const rawId = req.params.id || '';
      const countdownId = rawId.includes('.') ? rawId.split('.')[0] : rawId;
      const format = req.query.format || 'default';
      const renderKey = `${countdownId}:${format}`;

      const redis = await getRedis();

      if (redis) {
        await trackWithRedis(redis, ip, renderKey, res);
      } else {
        trackWithMemory(memoryMap, ip, renderKey, res);
      }
    } catch (err) {
      // Abuse guard must never block requests on internal errors
      console.error('[AbuseGuard] Error:', err.message);
    }

    next();
  };
};

/**
 * Redis-backed tracking using a HyperLogLog per IP per window.
 * HyperLogLog counts approximate unique elements with minimal memory.
 */
async function trackWithRedis(redis, ip, renderKey, res) {
  const redisKey = `abuse:${ip}`;

  // Add the render key to the HyperLogLog
  await redis.pfadd(redisKey, renderKey);

  // Set expiry on first touch
  const ttl = await redis.ttl(redisKey);
  if (ttl < 0) {
    await redis.expire(redisKey, WINDOW_SECONDS);
  }

  // Get approximate unique count
  const uniqueCount = await redis.pfcount(redisKey);

  if (uniqueCount > MAX_UNIQUE_KEYS) {
    flagAbuse(res, ip, uniqueCount);
  }
}

/**
 * In-memory fallback tracking using a Set per IP.
 */
function trackWithMemory(memoryMap, ip, renderKey, res) {
  const now = Date.now();
  let entry = memoryMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_SECONDS * 1000) {
    entry = { windowStart: now, keys: new Set() };
    memoryMap.set(ip, entry);
  }

  entry.keys.add(renderKey);

  if (entry.keys.size > MAX_UNIQUE_KEYS) {
    flagAbuse(res, ip, entry.keys.size);
  }
}

/**
 * Flags the request as suspected abuse.
 * Sets a signal on res.locals and logs without PII.
 */
function flagAbuse(res, ip, uniqueCount) {
  res.locals.abuseDetected = true;
  res.locals.forceCache = true;

  // Log without personal data — IP is operational metadata,
  // not personal data in this server-log context
  console.warn(
    `[AbuseGuard] Suspected cache-busting: ip=${ip} uniqueKeys=${uniqueCount} threshold=${MAX_UNIQUE_KEYS}`,
  );
}

export default abuseGuard;
