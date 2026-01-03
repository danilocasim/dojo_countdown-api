// ===========================================
// Health Check Routes
// ===========================================
// Defines routes for health monitoring endpoints.

import { Router } from 'express';
import * as healthController from '../controllers/health.controller.js';

const router = Router();

/**
 * @route   GET /health
 * @desc    Comprehensive health check with database status
 * @access  Public
 */
router.get('/', healthController.getHealth);

/**
 * @route   GET /health/live
 * @desc    Simple liveness probe
 * @access  Public
 */
router.get('/live', healthController.getLiveness);

export default router;
