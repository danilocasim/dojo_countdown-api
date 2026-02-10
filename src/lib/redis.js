// ===========================================
// Redis Client (Optional)
// ===========================================
// Provides an optional Redis connection for caching and
// other Redis-powered features.
//
// WHY OPTIONAL:
// - Redis is not required for core functionality
// - App should work without Redis (graceful degradation)
// - Useful for caching, rate limiting, sessions, etc.
//
// WHY LAZY INIT:
// - Only connect when actually needed
// - Avoids startup delays if Redis isn't used
// - Keeps cold starts fast for serverless

import Redis from 'ioredis';

let redisClient = null;
let connectionAttempted = false;

/**
 * Configuration from environment variables.
 *
 * Supports two formats:
 * 1. REDIS_URL - Full connection string (e.g., redis://user:pass@host:6379)
 * 2. Individual vars: REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
 */
const getRedisConfig = () => {
  const url = process.env.REDIS_URL;

  if (url) {
    return { url };
  }

  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT, 10) || 6379;
  const password = process.env.REDIS_PASSWORD;

  if (!host) {
    return null; // Redis not configured
  }

  return {
    host,
    port,
    password: password || undefined,
  };
};

/**
 * Creates and configures the Redis client.
 * Does NOT throw on connection failure.
 *
 * @returns {Redis|null} Redis client or null if not configured/failed
 */
const createRedisClient = () => {
  const config = getRedisConfig();

  if (!config) {
    console.log('[Redis] Skipped - no configuration found');
    return null;
  }

  try {
    const client = config.url
      ? new Redis(config.url, {
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => {
            if (times > 3) return null; // Stop retrying after 3 attempts
            return Math.min(times * 200, 2000);
          },
          lazyConnect: true,
        })
      : new Redis({
          host: config.host,
          port: config.port,
          password: config.password,
          maxRetriesPerRequest: 3,
          retryStrategy: (times) => {
            if (times > 3) return null;
            return Math.min(times * 200, 2000);
          },
          lazyConnect: true,
        });

    // Event handlers for connection lifecycle
    client.on('connect', () => {
      console.log('[Redis] Connected');
    });

    client.on('error', (err) => {
      // Log but don't crash - Redis is optional
      console.error('[Redis] Connection error:', err.message);
    });

    client.on('close', () => {
      console.log('[Redis] Connection closed');
    });

    return client;
  } catch (err) {
    console.error('[Redis] Failed to create client:', err.message);
    return null;
  }
};

/**
 * Gets the Redis client instance, initializing lazily if needed.
 * Returns null if Redis is not configured or connection failed.
 *
 * USAGE:
 *   const redis = await getRedis();
 *   if (redis) {
 *     await redis.set('key', 'value');
 *   }
 *
 * @returns {Promise<Redis|null>} Redis client or null
 */
export const getRedis = async () => {
  // Already attempted - return cached result
  if (connectionAttempted) {
    return redisClient;
  }

  connectionAttempted = true;
  redisClient = createRedisClient();

  if (!redisClient) {
    return null;
  }

  // Attempt to connect (lazyConnect: true means we must call connect())
  try {
    await redisClient.connect();
    return redisClient;
  } catch (err) {
    console.error('[Redis] Connection failed:', err.message);
    redisClient = null;
    return null;
  }
};

/**
 * Checks if Redis is available without triggering connection.
 *
 * @returns {boolean} True if Redis client exists and is ready
 */
export const isRedisAvailable = () => {
  return redisClient !== null && redisClient.status === 'ready';
};

/**
 * Gracefully closes the Redis connection.
 * Safe to call even if Redis was never initialized.
 *
 * @returns {Promise<void>}
 */
export const closeRedis = async () => {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log('[Redis] Disconnected gracefully');
    } catch (err) {
      console.error('[Redis] Error during disconnect:', err.message);
    }
    redisClient = null;
    connectionAttempted = false;
  }
};

export default {
  getRedis,
  isRedisAvailable,
  closeRedis,
};
