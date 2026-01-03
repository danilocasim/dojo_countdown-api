// ===========================================
// Route Index
// ===========================================
// Central route registration for the application.
// All routes are mounted here with their base paths.

import { Router } from 'express';
import healthRoutes from './health.routes.js';

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
router.use('/health', healthRoutes);

// ===========================================
// Future route registrations:
// router.use('/api/v1/auth', authRoutes);      // PHASE 2
// router.use('/api/v1/countdowns', countdownRoutes);  // PHASE 3
// router.use('/api/v1/billing', billingRoutes);       // PHASE 4
// ===========================================

export default router;
