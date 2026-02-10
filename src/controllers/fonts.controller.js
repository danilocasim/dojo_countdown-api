// ===========================================
// Fonts Controller
// ===========================================
// Handles HTTP requests for font catalog and custom font uploads.
// Preset fonts endpoint is public, custom fonts require authentication.

import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../lib/prisma.js';
import { deleteFontFile } from '../middlewares/upload.js';
import { registerCustomFont, unregisterCustomFont } from '../lib/fontLoader.js';
import {
  FONT_CATALOG,
  DEFAULT_FONT_ID,
  getFontsByCategory,
} from '../config/fonts.js';

// ===========================================
// Constants
// ===========================================

const MAX_CUSTOM_FONTS_PER_USER = {
  FREE: 0,
  BOOTSTRAP: 3,
  STARTUP: 10,
  ENTERPRISE: 50,
};

// ===========================================
// Public Endpoints
// ===========================================

/**
 * GET /api/v1/fonts
 *
 * Returns the list of available preset fonts for countdown rendering.
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

// ===========================================
// Authenticated Endpoints
// ===========================================

/**
 * GET /api/v1/fonts/custom
 *
 * Returns the list of custom fonts uploaded by the authenticated user.
 */
export const getCustomFonts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const customFonts = await prisma.customFont.findMany({
    where: {
      ownerId: userId,
      isActive: true,
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      fileName: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
    },
  });

  res.json({
    success: true,
    data: {
      fonts: customFonts,
      count: customFonts.length,
    },
  });
});

/**
 * POST /api/v1/fonts/upload
 *
 * Uploads a custom font file (.ttf or .otf).
 * Requires authentication.
 */
export const uploadFont = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userPlan = req.user.plan || 'FREE';

  // Check plan limits
  const maxFonts = MAX_CUSTOM_FONTS_PER_USER[userPlan] || 0;
  if (maxFonts === 0) {
    return res.status(403).json({
      success: false,
      message:
        'Custom fonts are not available on the FREE plan. Please upgrade to upload custom fonts.',
    });
  }

  // Check current font count
  const currentCount = await prisma.customFont.count({
    where: { ownerId: userId, isActive: true },
  });

  if (currentCount >= maxFonts) {
    return res.status(403).json({
      success: false,
      message: `You have reached the maximum of ${maxFonts} custom fonts for your plan.`,
    });
  }

  // Validate file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No font file provided. Please upload a .ttf or .otf file.',
    });
  }

  const { originalname, filename, path: filePath, size, mimetype } = req.file;

  // Get display name from request body or use original filename
  const displayName =
    req.body.name || originalname.replace(/\.(ttf|otf)$/i, '');

  try {
    // Create database record
    const customFont = await prisma.customFont.create({
      data: {
        ownerId: userId,
        name: displayName,
        fileName: originalname,
        storagePath: filePath,
        fileSize: size,
        mimeType: mimetype,
      },
    });

    // Register the font with canvas for immediate use
    const registered = await registerCustomFont(
      customFont.id,
      filePath,
      displayName,
    );

    res.status(201).json({
      success: true,
      message: 'Font uploaded successfully.',
      data: {
        id: customFont.id,
        name: customFont.name,
        fileName: customFont.fileName,
        fileSize: customFont.fileSize,
        isRegistered: registered,
        createdAt: customFont.createdAt,
      },
    });
  } catch (error) {
    // Clean up file if database insert fails
    await deleteFontFile(filePath);
    throw error;
  }
});

/**
 * DELETE /api/v1/fonts/custom/:id
 *
 * Deletes a custom font.
 * Requires authentication and ownership.
 */
export const deleteFont = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const fontId = req.params.id;

  // Find the font and verify ownership
  const font = await prisma.customFont.findFirst({
    where: {
      id: fontId,
      ownerId: userId,
    },
  });

  if (!font) {
    return res.status(404).json({
      success: false,
      message: 'Font not found.',
    });
  }

  // Delete the file from storage
  await deleteFontFile(font.storagePath);

  // Unregister from canvas
  unregisterCustomFont(fontId);

  // Delete database record
  await prisma.customFont.delete({
    where: { id: fontId },
  });

  res.json({
    success: true,
    message: 'Font deleted successfully.',
  });
});

/**
 * GET /api/v1/fonts/custom/:id
 *
 * Gets details of a specific custom font.
 * Requires authentication and ownership.
 */
export const getCustomFont = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const fontId = req.params.id;

  const font = await prisma.customFont.findFirst({
    where: {
      id: fontId,
      ownerId: userId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      fileName: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
    },
  });

  if (!font) {
    return res.status(404).json({
      success: false,
      message: 'Font not found.',
    });
  }

  res.json({
    success: true,
    data: font,
  });
});

export default {
  getFonts,
  getCustomFonts,
  uploadFont,
  deleteFont,
  getCustomFont,
};
