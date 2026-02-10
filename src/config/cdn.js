// ===========================================
// CDN Configuration
// ===========================================
// Controls CDN-friendly cache header behavior for
// rendered countdown images. Provider-agnostic —
// works with Cloudflare, CloudFront, Fastly, etc.
//
// HOW IT WORKS:
// - When CDN_ENABLED=true, public render responses
//   include s-maxage and stale-while-revalidate headers
//   so an upstream CDN can cache rendered images.
// - Browser-level caching stays disabled (max-age=0)
//   to ensure email clients always revalidate.
// - Preview responses always use no-store regardless.
//
// WHY SEPARATE CONFIG:
// - CDN concern is isolated from rendering logic
// - Easy to toggle per environment
// - No CDN provider logic leaks into controllers

/**
 * Whether CDN caching headers are enabled.
 * Set CDN_ENABLED=true in production behind a CDN.
 */
export const CDN_ENABLED = process.env.CDN_ENABLED === 'true';

/**
 * Optional CDN base URL for generating deterministic CDN URLs.
 * When set, embed code generator can use this instead of the origin.
 * Example: https://cdn.dojocountdown.com
 */
export const CDN_BASE_URL = process.env.CDN_BASE_URL || '';

/**
 * Default stale-while-revalidate window in seconds.
 * CDN serves stale content while fetching fresh in the background.
 */
export const STALE_WHILE_REVALIDATE = parseInt(
  process.env.CDN_STALE_WHILE_REVALIDATE || '2',
  10,
);

/**
 * Builds Cache-Control header value for public render responses.
 * Uses the render TTL (from cacheTtl.js) as s-maxage.
 *
 * Strategy:
 *   max-age=0           → browsers/email clients always revalidate
 *   s-maxage={ttl}      → CDN caches for the computed TTL
 *   stale-while-revalidate → CDN may serve stale during refresh
 *   public              → explicitly cacheable by shared caches
 *
 * @param {number} ttlSeconds - Cache TTL from getRenderCacheTtl()
 * @returns {string} Cache-Control header value
 */
export const buildCdnCacheControl = (ttlSeconds) => {
  if (!CDN_ENABLED || ttlSeconds <= 0) {
    return 'no-cache, no-store, must-revalidate, max-age=0';
  }

  return `public, max-age=0, s-maxage=${ttlSeconds}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`;
};

/**
 * Returns no-store Cache-Control for responses that must never be cached
 * (previews, quota-exceeded images).
 *
 * @returns {string} Cache-Control header value
 */
export const buildNoCacheCacheControl = () => {
  return 'no-cache, no-store, must-revalidate, max-age=0';
};

export default {
  CDN_ENABLED,
  CDN_BASE_URL,
  STALE_WHILE_REVALIDATE,
  buildCdnCacheControl,
  buildNoCacheCacheControl,
};
