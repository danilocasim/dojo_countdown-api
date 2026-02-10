// ===========================================
// Fonts Routes
// ===========================================
// Public endpoint for font catalog.
// Authenticated endpoints for custom fonts.

import { Router } from 'express';
import * as fontsController from '../controllers/fonts.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { fontUpload, handleUploadError } from '../middlewares/upload.js';

const router = Router();

// ===========================================
// Public Routes
// ===========================================

/**
 * @route   GET /api/v1/fonts
 * @desc    Get available preset fonts for countdown rendering
 * @access  Public
 * @query   grouped - If 'true', returns fonts grouped by category
 */
router.get('/', fontsController.getFonts);

// ===========================================
// Authenticated Routes (Custom Fonts)
// ===========================================

/**
 * @route   GET /api/v1/fonts/custom
 * @desc    Get user's custom fonts
 * @access  Private
 */
router.get('/custom', authenticate, fontsController.getCustomFonts);

/**
 * @route   POST /api/v1/fonts/upload
 * @desc    Upload a custom font file (.ttf or .otf)
 * @access  Private
 */
router.post(
  '/upload',
  authenticate,
  fontUpload.single('font'),
  handleUploadError,
  fontsController.uploadFont,
);

/**
 * @route   GET /api/v1/fonts/custom/:id
 * @desc    Get details of a specific custom font
 * @access  Private
 */
router.get('/custom/:id', authenticate, fontsController.getCustomFont);

/**
 * @route   DELETE /api/v1/fonts/custom/:id
 * @desc    Delete a custom font
 * @access  Private
 */
router.delete('/custom/:id', authenticate, fontsController.deleteFont);

export default router;
