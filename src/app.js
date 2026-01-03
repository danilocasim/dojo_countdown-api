// ===========================================
// Express Application Configuration
// ===========================================
// This module configures and exports the Express app.
// Separated from server.js for testability and modularity.
//
// WHY SEPARATE APP FROM SERVER?
// - Enables importing app for testing without starting the server
// - Cleaner separation of concerns
// - Easier to configure for different environments

import express from 'express';
import { registerMiddleware } from './middlewares/index.js';
import routes from './routes/index.js';
import notFoundHandler from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

/**
 * Creates and configures the Express application.
 * @returns {Express.Application} Configured Express app
 */
const createApp = () => {
  const app = express();

  // ===========================================
  // Trust proxy (required for rate limiting, secure cookies behind reverse proxy)
  // ===========================================
  app.set('trust proxy', 1);

  // ===========================================
  // Register Base Middleware
  // Order: Security → Parsing → Logging → Enhancement
  // ===========================================
  registerMiddleware(app);

  // ===========================================
  // API Routes
  // ===========================================
  app.use(routes);

  // ===========================================
  // Root endpoint - API information
  // ===========================================
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'DojoCountdown API',
      version: '1.0.0',
      documentation: '/api/docs', // Future: API documentation
      health: '/health',
    });
  });

  // ===========================================
  // Error Handling (Must be LAST)
  // ===========================================
  
  // 404 handler - catches undefined routes
  app.use(notFoundHandler);
  
  // Global error handler - catches all errors
  app.use(errorHandler);

  return app;
};

// Create and export the app instance
const app = createApp();

export default app;
