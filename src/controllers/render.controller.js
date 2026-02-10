// ===========================================
// Render Controller
// ===========================================
// Handles HTTP requests for countdown image rendering.
// Returns binary image data, not JSON.
//
// WHY SEPARATE CONTROLLER:
// - Different response format (binary vs JSON)
// - No authentication required
// - Special caching headers
// - Streaming response

import * as renderService from '../services/render.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getRedis } from '../lib/redis.js';
// generateRenderCacheKey available for hash-based keys when needed
// Current cache key uses id:format:frameCount (invalidated on config change)
import { getRenderCacheTtl, getTtlCategory } from '../utils/cacheTtl.js';
import {
  buildCdnCacheControl,
  buildNoCacheCacheControl,
} from '../config/cdn.js';

/**
 * GET /api/v1/render/:id
 * GET /api/v1/render/:id.png
 * GET /api/v1/render/:id.gif
 * GET /api/v1/render/:id.jpg
 *
 * Renders and returns a countdown image.
 * Public endpoint - no authentication.
 */
export const renderCountdownImage = asyncHandler(async (req, res) => {
  // Extract ID and format from params
  let { id } = req.params;
  let format = 'gif'; // Default to GIF for email compatibility

  // Check if format is in the ID (e.g., "abc123.gif")
  if (id.includes('.')) {
    const parts = id.split('.');
    id = parts[0];
    const ext = parts[1].toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
      format = ext === 'jpg' ? 'jpeg' : ext;
    }
  }

  // Query param override
  if (req.query.format) {
    const queryFormat = req.query.format.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(queryFormat)) {
      format = queryFormat === 'jpg' ? 'jpeg' : queryFormat;
    }
  }

  // Frame count override for GIF (optional)
  const frameCount = req.query.frames
    ? parseInt(req.query.frames, 10)
    : undefined;

  // ===========================================
  // Redis Cache Check
  // ===========================================
  let cacheKey = null;
  let redis = null;

  try {
    redis = await getRedis();
    if (redis) {
      // Generate cache key (without styleConfig for now - we'll get it after DB fetch)
      // For simple caching, use countdown ID + format + frameCount
      cacheKey = `render:${id}:${format}:${frameCount || 'default'}`;

      const cached = await redis.getBuffer(cacheKey);
      if (cached) {
        console.log(`[RenderCache] HIT: ${cacheKey}`);

        // Parse cached metadata from a separate key
        const metaKey = `${cacheKey}:meta`;
        const metaStr = await redis.get(metaKey);
        const meta = metaStr ? JSON.parse(metaStr) : {};

        // Set CDN-aware cache headers from cached metadata
        const cachedTtl = meta.ttl || 0;
        setRenderCacheHeaders(res, cachedTtl, cacheKey);
        res.set('Content-Type', meta.contentType || `image/${format}`);
        res.set('Content-Length', cached.length);
        res.set('X-Cache', 'HIT');

        if (meta.countdownId) res.set('X-Countdown-Id', meta.countdownId);
        if (meta.isExpired !== undefined)
          res.set('X-Countdown-Expired', meta.isExpired.toString());
        if (meta.format) res.set('X-Countdown-Format', meta.format);
        res.set('X-Generated-At', meta.generatedAt || new Date().toISOString());

        return res.send(cached);
      }
      console.log(`[RenderCache] MISS: ${cacheKey}`);
    }
  } catch (cacheErr) {
    // Redis failure - fall through to normal rendering
    console.error(`[RenderCache] Error checking cache:`, cacheErr.message);
  }

  // ===========================================
  // Render (cache miss or Redis unavailable)
  // ===========================================
  const result = await renderService.renderCountdownById(id, {
    format,
    frameCount,
  });

  // ===========================================
  // Redis Cache Set (non-blocking)
  // ===========================================
  // Calculate dynamic TTL based on countdown state
  const renderTtl = getRenderCacheTtl({
    isExpired: result.metadata.isExpired,
    remainingMs: result.metadata.remainingMs,
  });

  if (redis && cacheKey && !result.quotaExceeded) {
    // Don't cache quota exceeded images
    setImmediate(async () => {
      try {
        // Store the image buffer
        await redis.setex(cacheKey, renderTtl, result.buffer);

        // Store metadata separately (for headers on cache hit)
        const metaKey = `${cacheKey}:meta`;
        const meta = {
          contentType: result.contentType,
          countdownId: result.metadata.countdownId,
          isExpired: result.metadata.isExpired,
          format: result.metadata.format,
          generatedAt: result.metadata.generatedAt,
          ttl: renderTtl,
        };
        await redis.setex(metaKey, renderTtl, JSON.stringify(meta));

        console.log(
          `[RenderCache] SET: ${cacheKey} (TTL: ${renderTtl}s, category: ${getTtlCategory(renderTtl)})`,
        );
      } catch (cacheErr) {
        // Cache write failure - log but don't affect response
        console.error(`[RenderCache] Error writing cache:`, cacheErr.message);
      }
    });
  }

  // Set CDN-aware cache headers (quota-exceeded gets no-cache)
  if (result.quotaExceeded) {
    setNoCacheHeaders(res);
  } else {
    setRenderCacheHeaders(res, renderTtl, cacheKey);
  }

  // Set content type
  res.set('Content-Type', result.contentType);

  // Set content length for better streaming
  res.set('Content-Length', result.buffer.length);

  // Add custom headers for debugging/analytics
  res.set('X-Countdown-Id', result.metadata.countdownId);
  res.set(
    'X-Countdown-Expired',
    result.metadata.isExpired?.toString() || 'false',
  );
  res.set('X-Countdown-Format', result.metadata.format);
  res.set('X-Generated-At', result.metadata.generatedAt);
  res.set('X-Cache', 'MISS');

  // Quota headers
  if (result.quotaExceeded) {
    res.set('X-Quota-Exceeded', 'true');
  }
  if (result.metadata.usage) {
    res.set('X-Usage-Used', result.metadata.usage.used.toString());
    res.set('X-Usage-Limit', result.metadata.usage.limit.toString());
  }

  if (result.metadata.frameCount) {
    res.set('X-Gif-Frames', result.metadata.frameCount.toString());
  }

  // Send image buffer
  res.send(result.buffer);
});

/**
 * GET /api/v1/render/:id/embed
 *
 * Returns embed code for the countdown image.
 */
export const getEmbedCode = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // Get render stats for metadata
  const stats = await renderService.getRenderStats(id);

  const embedCodes = {
    // Animated GIF for email (recommended)
    gif: {
      html: `<img src="${baseUrl}/api/v1/render/${id}.gif" alt="Countdown Timer" style="max-width: 100%; height: auto;" />`,
      url: `${baseUrl}/api/v1/render/${id}.gif`,
    },
    // Static PNG
    png: {
      html: `<img src="${baseUrl}/api/v1/render/${id}.png" alt="Countdown Timer" style="max-width: 100%; height: auto;" />`,
      url: `${baseUrl}/api/v1/render/${id}.png`,
    },
    // Markdown
    markdown: `![Countdown Timer](${baseUrl}/api/v1/render/${id}.gif)`,
    // BBCode
    bbcode: `[img]${baseUrl}/api/v1/render/${id}.gif[/img]`,
  };

  res.json({
    success: true,
    data: {
      countdown: stats,
      embedCodes,
      recommended: 'gif',
      note: 'Use GIF format for animated countdown in emails. PNG for static images.',
    },
  });
});

/**
 * POST /api/v1/render/preview
 *
 * Renders a preview image for a style configuration.
 * Requires authentication.
 * Does NOT count against usage.
 */
export const renderPreview = asyncHandler(async (req, res) => {
  const { styleConfig, format = 'gif' } = req.body;
  const userPlan = req.user?.plan || 'FREE';

  // Render preview
  const buffer = await renderService.renderStylePreview(
    styleConfig,
    userPlan,
    format,
  );

  // Set headers
  setNoCacheHeaders(res);

  const contentType =
    format === 'gif'
      ? 'image/gif'
      : format === 'jpeg'
        ? 'image/jpeg'
        : 'image/png';

  res.set('Content-Type', contentType);
  res.set('Content-Length', buffer.length);

  // Send image
  res.send(buffer);
});

/**
 * Sets CDN-aware cache headers for public render responses.
 * When CDN is enabled, uses s-maxage so the CDN caches while
 * browsers/email clients still revalidate on every view.
 *
 * @param {Response} res - Express response object
 * @param {number} ttlSeconds - Cache TTL (0 = no-cache)
 * @param {string} [etag] - Optional ETag value for conditional requests
 */
const setRenderCacheHeaders = (res, ttlSeconds = 0, etag = null) => {
  res.set({
    'Cache-Control': buildCdnCacheControl(ttlSeconds),
    Pragma: 'no-cache',
    Expires: '0',
    'X-Content-Type-Options': 'nosniff',
  });

  if (etag) {
    res.set('ETag', `"${etag}"`);
  }
};

/**
 * Sets strict no-cache headers for responses that must never be
 * cached by any layer (previews, quota-exceeded images).
 *
 * @param {Response} res - Express response object
 */
const setNoCacheHeaders = (res) => {
  res.set({
    'Cache-Control': buildNoCacheCacheControl(),
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
    'CDN-Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
};

export default {
  renderCountdownImage,
  getEmbedCode,
  renderPreview,
};
