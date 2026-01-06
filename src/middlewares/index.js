// ===========================================
// Middleware Index
// ===========================================
// Centralized middleware registration.
// Order matters - security middleware first, then parsing, then logging.

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

/**
 * Registers all base middleware on the Express app.
 *
 * WHY: Centralizing middleware setup:
 * - Keeps app.js clean and focused
 * - Makes middleware order explicit and intentional
 * - Easier to modify middleware configuration
 *
 * @param {Express.Application} app - Express application instance
 */
export const registerMiddleware = (app) => {
  // ===========================================
  // Security Middleware (First!)
  // ===========================================

  /**
   * Helmet - Sets security-related HTTP headers
   * WHY: Protects against common web vulnerabilities like XSS, clickjacking
   */
  // app.use(helmet());

  /**
   * CORS - Cross-Origin Resource Sharing
   * WHY: Controls which domains can access the API
   * TODO: Configure allowed origins for production
   */
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*", // Configure in production
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      maxAge: 86400, // 24 hours - browsers cache preflight response
    })
  );

  // ===========================================
  // Body Parsing Middleware
  // ===========================================

  /**
   * JSON Parser
   * WHY: Parses incoming JSON request bodies
   * Limit protects against large payload attacks
   */
  app.use(express.json({ limit: "10mb" }));

  /**
   * URL-encoded Parser
   * WHY: Parses URL-encoded form data
   */
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // ===========================================
  // Logging Middleware
  // ===========================================

  /**
   * Morgan - HTTP request logger
   * WHY: Essential for debugging, monitoring, and audit trails
   *
   * Formats:
   * - 'dev': Concise colored output for development
   * - 'combined': Standard Apache combined log format for production
   */
  const morganFormat =
    process.env.NODE_ENV === "production" ? "combined" : "dev";
  app.use(
    morgan(morganFormat, {
      // Skip logging for health checks in production (too noisy)
      skip: (req, res) => {
        return (
          process.env.NODE_ENV === "production" && req.url.startsWith("/health")
        );
      },
    })
  );

  // ===========================================
  // Request Enhancement Middleware
  // ===========================================

  /**
   * Add request timestamp
   * WHY: Useful for logging, debugging, and response time calculation
   */
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });
};

export default registerMiddleware;
