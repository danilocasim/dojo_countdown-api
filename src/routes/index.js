// ===========================================
// Route Index
// ===========================================
// Central route registration for the application.
// All routes are mounted here with their base paths.

import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import countdownRoutes from "./countdown.routes.js";
import renderRoutes from "./render.routes.js";
import usageRoutes from "./usage.routes.js";

const router = Router();

/**
 * API Routes
 *
 * WHY: Centralizing route registration provides:
 * - Single source of truth for all endpoints
 * - Easy to see the full API surface
 * - Simple to add API versioning later
 */

// Health check routes (no /api prefix - standard for health endpoints)
router.use("/health", healthRoutes);

// API v1 routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/countdowns", countdownRoutes);
router.use("/api/v1/render", renderRoutes);
router.use("/api/v1/usage", usageRoutes);

// ===========================================
// Future route registrations:
// router.use('/api/v1/billing', billingRoutes); // PHASE 6
// router.use('/api/v1/analytics', analyticsRoutes);
// ===========================================

export default router;
