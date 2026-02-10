// ===========================================
// Fonts Routes
// ===========================================
// Public endpoint for font catalog.

import { Router } from 'express';
import * as fontsController from '../controllers/fonts.controller.js';

const router = Router();

/**
 * @route   GET /api/v1/fonts
 * @desc    Get available fonts for countdown rendering
 * @access  Public
 * @query   grouped - If 'true', returns fonts grouped by category
 */
router.get('/', fontsController.getFonts);

export default router;
