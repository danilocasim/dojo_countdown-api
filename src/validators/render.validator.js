// ===========================================
// Render Validators
// ===========================================
// Input validation for render endpoints.

import { body, param, query } from "express-validator";

/**
 * Render countdown validation.
 */
export const renderCountdownValidator = [
  param("id").notEmpty().withMessage("Countdown ID is required"),

  query("format")
    .optional()
    .isIn(["png", "jpeg", "jpg", "gif"])
    .withMessage("Format must be png, jpeg, or gif"),

  query("frames")
    .optional()
    .isInt({ min: 1, max: 60 })
    .withMessage("Frames must be between 1 and 60")
    .toInt(),
];

/**
 * Preview render validation.
 */
export const renderPreviewValidator = [
  body("styleConfig")
    .optional()
    .isObject()
    .withMessage("Style config must be an object"),

  body("format")
    .optional()
    .isIn(["png", "jpeg", "jpg", "gif"])
    .withMessage("Format must be png, jpeg, or gif"),
];
