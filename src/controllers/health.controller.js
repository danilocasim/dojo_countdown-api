// ===========================================
// Health Check Controller
// ===========================================
// Handles HTTP requests for health endpoints.
// Controllers are thin - they delegate to services.

import * as healthService from '../services/health.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * GET /health
 * Returns comprehensive health status including database connectivity.
 * 
 * WHY: Full health check for monitoring systems that need to know
 * if all dependencies are functioning.
 */
export const getHealth = asyncHandler(async (req, res) => {
  const health = await healthService.getHealthStatus();
  
  // Return 503 if unhealthy, 200 if healthy
  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  res.status(statusCode).json({
    success: health.status === 'healthy',
    data: health,
  });
});

/**
 * GET /health/live
 * Simple liveness check - just verifies the process is running.
 * 
 * WHY: Fast endpoint for Kubernetes liveness probes.
 * Should not depend on external services.
 */
export const getLiveness = asyncHandler(async (req, res) => {
  const liveness = healthService.getLivenessStatus();
  
  res.status(200).json({
    success: true,
    data: liveness,
  });
});
