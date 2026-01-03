// ===========================================
// Global Error Handler Middleware
// ===========================================
// Centralized error handling for the entire application.
// Catches all errors and formats consistent JSON responses.

import { AppError } from '../utils/errors.js';

/**
 * Handles Prisma-specific errors and converts them to AppErrors.
 * WHY: Prisma throws specific error codes that should map to 
 * meaningful HTTP responses.
 */
const handlePrismaError = (err) => {
  // P2002: Unique constraint violation
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    return new AppError(`A record with this ${field} already exists`, 409);
  }
  
  // P2025: Record not found
  if (err.code === 'P2025') {
    return new AppError('Record not found', 404);
  }
  
  // P2003: Foreign key constraint failed
  if (err.code === 'P2003') {
    return new AppError('Related record not found', 400);
  }
  
  return err;
};

/**
 * Formats error response for development environment.
 * Includes full error details for debugging.
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

/**
 * Formats error response for production environment.
 * Hides implementation details from clients.
 */
const sendErrorProd = (err, res) => {
  // Operational errors: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }), // Include validation errors if present
    });
  } else {
    // Programming errors: don't leak details
    console.error('ERROR 💥:', err);
    
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

/**
 * Global error handling middleware.
 * Must be registered LAST in the middleware chain.
 * 
 * WHY: Express identifies error-handling middleware by its
 * 4-parameter signature (err, req, res, next).
 */
const errorHandler = (err, req, res, next) => {
  // Set defaults
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Handle Prisma errors
  if (err.code && err.code.startsWith('P')) {
    err = handlePrismaError(err);
  }
  
  // Handle JSON parsing errors
  if (err.type === 'entity.parse.failed') {
    err = new AppError('Invalid JSON in request body', 400);
  }
  
  // Send appropriate response based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default errorHandler;
