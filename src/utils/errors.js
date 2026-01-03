// ===========================================
// Custom Error Classes
// ===========================================
// These custom error classes enable structured error handling
// throughout the application. Each error type maps to an HTTP
// status code and can carry additional context.

/**
 * Base application error class.
 * All custom errors extend from this class.
 * 
 * WHY: Centralizes error structure so the global error handler
 * can consistently format responses regardless of where the
 * error originated.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational; // Distinguishes expected errors from bugs
    
    // Capture stack trace, excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 Bad Request - Client sent invalid data
 */
export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * 403 Forbidden - Authenticated but not permitted
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

/**
 * 404 Not Found - Resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * 409 Conflict - Resource conflict (e.g., duplicate email)
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409);
  }
}

/**
 * 422 Unprocessable Entity - Validation failed
 */
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 422);
    this.errors = errors; // Array of field-level validation errors
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}

/**
 * 500 Internal Server Error - Unexpected server error
 */
export class InternalError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, false); // Not operational - indicates a bug
  }
}
