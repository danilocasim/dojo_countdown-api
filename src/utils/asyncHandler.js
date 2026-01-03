// ===========================================
// Async Handler Utility
// ===========================================
// Wraps async route handlers to catch rejected promises
// and forward them to the global error handler.

/**
 * Wraps an async function and catches any errors.
 * 
 * WHY: Express doesn't automatically catch errors from async
 * functions. Without this wrapper, unhandled promise rejections
 * would crash the server instead of returning proper error responses.
 * 
 * USAGE:
 * router.get('/route', asyncHandler(async (req, res) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 * 
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped function that catches errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
