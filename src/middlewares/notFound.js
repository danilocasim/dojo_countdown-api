// ===========================================
// 404 Not Found Handler
// ===========================================
// Catches all requests to undefined routes.
// Must be registered AFTER all valid routes.

import { NotFoundError } from '../utils/errors.js';

/**
 * Middleware to handle requests to undefined routes.
 * 
 * WHY: This catches any request that doesn't match a defined route
 * and creates a proper 404 error that flows to the global error handler.
 */
const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};

export default notFoundHandler;
