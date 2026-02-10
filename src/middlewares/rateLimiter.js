// ===========================================
// Rate Limiter Middleware
// ===========================================
// Prevents abuse by limiting request frequency.
// Different limits for different endpoint types.
//
// WHY RATE LIMITING:
// - Prevents brute force attacks on auth
// - Protects against DoS
// - Ensures fair resource usage
// - Required for production APIs

import rateLimit from "express-rate-limit";
import { RateLimitError } from "../utils/errors.js";
import { createRedisRateLimitStore } from "../lib/redisRateLimitStore.js";

/**
 * Creates custom error response for rate limit exceeded.
 */
const rateLimitHandler = (req, res, next, options) => {
  throw new RateLimitError(
    `Too many requests. Please try again after ${Math.ceil(
      options.windowMs / 1000 / 60
    )} minutes.`
  );
};

/**
 * Default rate limiter for general API endpoints.
 * 100 requests per 15 minutes per IP.
 */
export const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip, // Rate limit by IP
});

/**
 * Strict rate limiter for authentication endpoints.
 * Prevents brute force attacks on login/signup.
 *
 * Login: 10 attempts per 15 minutes
 * WHY: Limits credential stuffing while allowing legitimate retries
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many authentication attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
  skipSuccessfulRequests: false, // Count all requests
});

/**
 * Very strict limiter for signup.
 * Prevents mass account creation.
 *
 * 5 signups per hour per IP
 */
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many accounts created from this IP. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
});

/**
 * Rate limiter for password-related operations.
 * Stricter than general auth to prevent password attacks.
 *
 * 5 attempts per 15 minutes
 */
export const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many password attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
});

/**
 * Rate limiter for token refresh.
 * More permissive since refresh is called frequently.
 *
 * 30 refreshes per hour
 */
export const refreshLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: "Too many refresh attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
});

/**
 * Rate limiter for countdown image renders.
 * High limit but protects against abuse.
 *
 * 1000 requests per minute per IP
 * WHY HIGH: Countdowns are embedded in emails, may get many views quickly
 */
export const renderLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000,
  message: "Too many requests. Please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
});

/**
 * Stricter rate limiter for public render endpoints.
 * Uses Redis-backed counters for distributed consistency.
 *
 * 300 requests per minute per IP.
 * WHY STRICTER: Prevents sustained abuse while allowing
 * CDN revalidation bursts. CDN absorbs most legitimate traffic,
 * so direct backend hits above this threshold indicate abuse.
 *
 * Falls back to in-memory if Redis unavailable.
 */
export const renderPublicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.RENDER_RATE_LIMIT_MAX || "300", 10),
  message: "Too many render requests. Please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
  store: createRedisRateLimitStore({ prefix: "rl:render:" }),
});

/**
 * Burst limiter for short-window abuse detection.
 * Catches rapid-fire requests that the per-minute limiter misses.
 *
 * 60 requests per 10 seconds per IP.
 */
export const renderBurstLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: parseInt(process.env.RENDER_BURST_LIMIT_MAX || "60", 10),
  message: "Too many requests in a short period. Please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => req.ip,
  store: createRedisRateLimitStore({ prefix: "rl:render-burst:" }),
});

/**
 * Creates a custom rate limiter with specified options.
 *
 * @param {Object} options - Rate limit options
 * @returns {Function} Express middleware
 */
export const createLimiter = (options) => {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: (req) => req.ip,
    ...options,
  });
};

export default {
  defaultLimiter,
  authLimiter,
  signupLimiter,
  passwordLimiter,
  refreshLimiter,
  renderLimiter,
  renderPublicLimiter,
  renderBurstLimiter,
  createLimiter,
};
