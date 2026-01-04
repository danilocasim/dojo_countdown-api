// ===========================================
// Countdown Validators
// ===========================================
// Input validation schemas for countdown endpoints.

import { body, param, query } from "express-validator";

/**
 * Valid IANA timezone check.
 * Uses Intl.DateTimeFormat to validate timezone strings.
 */
const isValidTimezone = (value) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Style config validation.
 * Validates the JSON structure for countdown styling.
 */
const validateStyleConfig = (value) => {
  if (!value || typeof value !== "object") {
    return true; // Optional, defaults will be applied
  }

  const allowedKeys = [
    "fontFamily",
    "fontSize",
    "fontColor",
    "backgroundColor",
    "accentColor",
    "layout",
    "showLabels",
    "labelStyle",
    "showDays",
    "showHours",
    "showMinutes",
    "showSeconds",
    "padding",
    "borderRadius",
    "showBranding",
  ];

  const providedKeys = Object.keys(value);
  const invalidKeys = providedKeys.filter((key) => !allowedKeys.includes(key));

  if (invalidKeys.length > 0) {
    throw new Error(`Invalid style config keys: ${invalidKeys.join(", ")}`);
  }

  return true;
};

/**
 * Create countdown validation schema.
 */
export const createCountdownValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("endAt")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .custom((value) => {
      const endDate = new Date(value);
      const now = new Date();
      if (endDate <= now) {
        throw new Error("End date must be in the future");
      }
      return true;
    }),

  body("timezone")
    .optional()
    .trim()
    .custom((value) => {
      if (value && !isValidTimezone(value)) {
        throw new Error(
          "Invalid timezone. Use IANA format (e.g., America/New_York)"
        );
      }
      return true;
    }),

  body("styleConfig")
    .optional()
    .isObject()
    .withMessage("Style config must be an object")
    .custom(validateStyleConfig),
];

/**
 * Update countdown validation schema.
 */
export const updateCountdownValidator = [
  param("id")
    .notEmpty()
    .withMessage("Countdown ID is required")
    .isString()
    .withMessage("Countdown ID must be a string"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("endAt")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .custom((value) => {
      if (value) {
        const endDate = new Date(value);
        const now = new Date();
        if (endDate <= now) {
          throw new Error("End date must be in the future");
        }
      }
      return true;
    }),

  body("timezone")
    .optional()
    .trim()
    .custom((value) => {
      if (value && !isValidTimezone(value)) {
        throw new Error(
          "Invalid timezone. Use IANA format (e.g., America/New_York)"
        );
      }
      return true;
    }),

  body("status")
    .optional()
    .isIn(["ACTIVE", "DISABLED"])
    .withMessage("Status must be ACTIVE or DISABLED"),

  body("styleConfig")
    .optional()
    .isObject()
    .withMessage("Style config must be an object")
    .custom(validateStyleConfig),
];

/**
 * Get countdown by ID validation schema.
 */
export const getCountdownValidator = [
  param("id")
    .notEmpty()
    .withMessage("Countdown ID is required")
    .isString()
    .withMessage("Countdown ID must be a string"),
];

/**
 * Delete countdown validation schema.
 */
export const deleteCountdownValidator = [
  param("id")
    .notEmpty()
    .withMessage("Countdown ID is required")
    .isString()
    .withMessage("Countdown ID must be a string"),
];

/**
 * List countdowns validation schema.
 */
export const listCountdownsValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50")
    .toInt(),

  query("status")
    .optional()
    .isIn(["ACTIVE", "EXPIRED", "DISABLED", "all"])
    .withMessage("Status must be ACTIVE, EXPIRED, DISABLED, or all"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "endAt", "title"])
    .withMessage("Sort by must be createdAt, endAt, or title"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc"),
];
