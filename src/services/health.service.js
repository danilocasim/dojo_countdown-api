// ===========================================
// Health Check Service
// ===========================================
// Business logic for health checks.
// Tests database connectivity and returns system status.

import prisma from '../lib/prisma.js';

/**
 * Performs comprehensive health check.
 * 
 * WHY: Health checks are essential for:
 * - Load balancer routing decisions
 * - Kubernetes/Docker orchestration
 * - Monitoring and alerting systems
 * - Deployment verification
 * 
 * @returns {Object} Health status with database connectivity
 */
export const getHealthStatus = async () => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: {
        status: 'unknown',
        latency: null,
      },
    },
  };

  // Test database connectivity
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;
    
    healthStatus.checks.database = {
      status: 'connected',
      latency: `${latency}ms`,
    };
  } catch (error) {
    healthStatus.status = 'unhealthy';
    healthStatus.checks.database = {
      status: 'disconnected',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Connection failed',
    };
  }

  return healthStatus;
};

/**
 * Simple liveness check (no external dependencies).
 * 
 * WHY: Liveness probes should be fast and only verify
 * the process is running, not external dependencies.
 * Used by Kubernetes to restart stuck containers.
 * 
 * @returns {Object} Basic liveness status
 */
export const getLivenessStatus = () => {
  return {
    status: 'alive',
    timestamp: new Date().toISOString(),
  };
};
