// ===========================================
// User Validators
// ===========================================
// Input validation schemas for user-related endpoints.

import { body, query, param } from "express-validator";

/**
 * Update profile validation schema.
 */
export const updateProfileValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),
];

/**
 * List users validation schema (admin).
 */
export const listUsersValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search term too long"),

  query("plan")
    .optional()
    .isIn(["FREE", "STARTER", "PRO", "ENTERPRISE"])
    .withMessage("Invalid plan type"),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean")
    .toBoolean(),
];

/**
 * User ID parameter validation.
 */
export const userIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("User ID must be a string"),
];
