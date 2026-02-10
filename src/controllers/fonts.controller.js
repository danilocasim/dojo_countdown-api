// ===========================================
// Fonts Controller
// ===========================================
// Handles HTTP requests for font catalog.
// Public endpoint - no authentication required.

import asyncHandler from '../utils/asyncHandler.js';
import {
  FONT_CATALOG,
  DEFAULT_FONT_ID,
  getFontsByCategory,
} from '../config/fonts.js';

/**
 * GET /api/v1/fonts
 *
 * Returns the list of available fonts for countdown rendering.
 * Public endpoint - no authentication required.
 */
export const getFonts = asyncHandler(async (req, res) => {
  // Optional: group by category
  const grouped = req.query.grouped === 'true';

  if (grouped) {
    res.json({
      success: true,
      data: {
        fonts: getFontsByCategory(),
        defaultFontId: DEFAULT_FONT_ID,
      },
    });
  } else {
    res.json({
      success: true,
      data: {
        fonts: FONT_CATALOG,
        defaultFontId: DEFAULT_FONT_ID,
      },
    });
  }
});

export default {
  getFonts,
};
