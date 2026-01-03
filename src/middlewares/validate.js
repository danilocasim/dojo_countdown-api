// ===========================================
// Validation Middleware
// ===========================================
// Processes express-validator results and throws formatted errors.
//
// WHY MIDDLEWARE:
// - Centralizes validation error handling
// - Consistent error format across all endpoints
// - Reduces boilerplate in controllers

import { validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js";

/**
 * Middleware that checks for validation errors.
 * Should be used after validator arrays in route definitions.
 *
 * USAGE:
 * router.post('/signup',
 *   signupValidator,  // Array of validation rules
 *   validate,         // This middleware
 *   authController.signup
 * );
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // Format errors for consistent API response
  const formattedErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
    value: error.value,
  }));

  // Remove duplicate errors for same field
  const uniqueErrors = formattedErrors.reduce((acc, error) => {
    const existing = acc.find((e) => e.field === error.field);
    if (!existing) {
      acc.push(error);
    }
    return acc;
  }, []);

  throw new ValidationError("Validation failed", uniqueErrors);
};

export default validate;
