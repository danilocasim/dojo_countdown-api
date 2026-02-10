// ===========================================
// Backgrounds Routes
// ===========================================
// Authenticated endpoints for background image management.

import { Router } from 'express';
import * as backgroundsController from '../controllers/backgrounds.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { imageUpload, handleUploadError } from '../middlewares/upload.js';

const router = Router();

// ===========================================
// All routes require authentication
// ===========================================

/**
 * @route   GET /api/v1/backgrounds
 * @desc    Get user's background images
 * @access  Private
 */
router.get('/', authenticate, backgroundsController.getBackgrounds);

/**
 * @route   POST /api/v1/backgrounds/upload
 * @desc    Upload a background image file (.jpg, .png, .webp)
 * @access  Private
 */
router.post(
  '/upload',
  authenticate,
  imageUpload.single('image'),
  handleUploadError,
  backgroundsController.uploadBackground,
);

/**
 * @route   GET /api/v1/backgrounds/:id
 * @desc    Get details of a specific background image
 * @access  Private
 */
router.get('/:id', authenticate, backgroundsController.getBackground);

/**
 * @route   GET /api/v1/backgrounds/:id/image
 * @desc    Get the actual background image file
 * @access  Private
 */
router.get(
  '/:id/image',
  authenticate,
  backgroundsController.getBackgroundImage,
);

/**
 * @route   DELETE /api/v1/backgrounds/:id
 * @desc    Delete a background image
 * @access  Private
 */
router.delete('/:id', authenticate, backgroundsController.deleteBackground);

export default router;
