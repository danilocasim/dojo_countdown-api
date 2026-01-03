// ===========================================
// Authentication Routes
// ===========================================
// Defines all auth-related endpoints with middleware chain.

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import {
  signupValidator,
  loginValidator,
  refreshValidator,
  logoutValidator,
} from "../validators/auth.validator.js";
import {
  authLimiter,
  signupLimiter,
  refreshLimiter,
} from "../middlewares/rateLimiter.js";

const router = Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Create new user account
 * @access  Public
 * @ratelimit 5 requests per hour per IP
 */
router.post(
  "/signup",
  signupLimiter,
  signupValidator,
  validate,
  authController.signup
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user and return tokens
 * @access  Public
 * @ratelimit 10 requests per 15 minutes per IP
 */
router.post(
  "/login",
  authLimiter,
  loginValidator,
  validate,
  authController.login
);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public (with valid refresh token)
 * @ratelimit 30 requests per hour per IP
 */
router.post(
  "/refresh",
  refreshLimiter,
  refreshValidator,
  validate,
  authController.refresh
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Invalidate refresh token (single session)
 * @access  Public (with valid refresh token)
 */
router.post("/logout", logoutValidator, validate, authController.logout);

/**
 * @route   POST /api/v1/auth/logout-all
 * @desc    Invalidate all refresh tokens (all sessions)
 * @access  Private
 */
router.post("/logout-all", authenticate, authController.logoutAll);

/**
 * @route   GET /api/v1/auth/sessions
 * @desc    Get list of active sessions
 * @access  Private
 */
router.get("/sessions", authenticate, authController.getSessions);

export default router;
