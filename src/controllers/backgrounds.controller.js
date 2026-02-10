// ===========================================
// Backgrounds Controller
// ===========================================
// Handles HTTP requests for background image management.
// All endpoints require authentication.

import { loadImage } from 'canvas';
import { createReadStream } from 'fs';
import { existsSync } from 'fs';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../lib/prisma.js';
import { deleteImageFile } from '../middlewares/upload.js';

// ===========================================
// Constants
// ===========================================

const MAX_BACKGROUNDS_PER_USER = {
  FREE: 0,
  BOOTSTRAP: 5,
  STARTUP: 20,
  ENTERPRISE: 100,
};

// Maximum dimensions for background images (aspect ratio preserved)
const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 800;

// ===========================================
// Authenticated Endpoints
// ===========================================

/**
 * GET /api/v1/backgrounds
 *
 * Returns the list of background images uploaded by the authenticated user.
 */
export const getBackgrounds = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const backgrounds = await prisma.backgroundImage.findMany({
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
      width: true,
      height: true,
      createdAt: true,
    },
  });

  res.json({
    success: true,
    data: {
      backgrounds,
      count: backgrounds.length,
    },
  });
});

/**
 * POST /api/v1/backgrounds/upload
 *
 * Uploads a background image file (.jpg, .png, .webp).
 * Requires authentication.
 */
export const uploadBackground = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userPlan = req.user.plan || 'FREE';

  // Check plan limits
  const maxBackgrounds = MAX_BACKGROUNDS_PER_USER[userPlan] || 0;
  if (maxBackgrounds === 0) {
    return res.status(403).json({
      success: false,
      message:
        'Background images are not available on the FREE plan. Please upgrade to upload backgrounds.',
    });
  }

  // Check current background count
  const currentCount = await prisma.backgroundImage.count({
    where: { ownerId: userId, isActive: true },
  });

  if (currentCount >= maxBackgrounds) {
    return res.status(403).json({
      success: false,
      message: `You have reached the maximum of ${maxBackgrounds} background images for your plan.`,
    });
  }

  // Validate file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message:
        'No image file provided. Please upload a .jpg, .png, or .webp file.',
    });
  }

  const { originalname, filename, path: filePath, size, mimetype } = req.file;

  // Get display name from request body or use original filename
  const displayName =
    req.body.name || originalname.replace(/\.(jpg|jpeg|png|webp)$/i, '');

  try {
    // Load image to get dimensions
    const image = await loadImage(filePath);
    const { width, height } = image;

    // Validate dimensions aren't too large
    if (width > MAX_IMAGE_WIDTH * 2 || height > MAX_IMAGE_HEIGHT * 2) {
      await deleteImageFile(filePath);
      return res.status(400).json({
        success: false,
        message: `Image dimensions too large. Maximum is ${MAX_IMAGE_WIDTH * 2}x${MAX_IMAGE_HEIGHT * 2} pixels.`,
      });
    }

    // Create database record
    const background = await prisma.backgroundImage.create({
      data: {
        ownerId: userId,
        name: displayName,
        fileName: originalname,
        storagePath: filePath,
        fileSize: size,
        mimeType: mimetype,
        width,
        height,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Background image uploaded successfully.',
      data: {
        id: background.id,
        name: background.name,
        fileName: background.fileName,
        fileSize: background.fileSize,
        width: background.width,
        height: background.height,
        createdAt: background.createdAt,
      },
    });
  } catch (error) {
    // Clean up file if database insert fails
    await deleteImageFile(filePath);
    throw error;
  }
});

/**
 * DELETE /api/v1/backgrounds/:id
 *
 * Deletes a background image.
 * Requires authentication and ownership.
 */
export const deleteBackground = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.id;

  // Find the image and verify ownership
  const background = await prisma.backgroundImage.findFirst({
    where: {
      id: imageId,
      ownerId: userId,
    },
  });

  if (!background) {
    return res.status(404).json({
      success: false,
      message: 'Background image not found.',
    });
  }

  // Delete the file from storage
  await deleteImageFile(background.storagePath);

  // Delete database record
  await prisma.backgroundImage.delete({
    where: { id: imageId },
  });

  res.json({
    success: true,
    message: 'Background image deleted successfully.',
  });
});

/**
 * GET /api/v1/backgrounds/:id
 *
 * Gets details of a specific background image.
 * Requires authentication and ownership.
 */
export const getBackground = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.id;

  const background = await prisma.backgroundImage.findFirst({
    where: {
      id: imageId,
      ownerId: userId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      fileName: true,
      fileSize: true,
      mimeType: true,
      width: true,
      height: true,
      createdAt: true,
    },
  });

  if (!background) {
    return res.status(404).json({
      success: false,
      message: 'Background image not found.',
    });
  }

  res.json({
    success: true,
    data: background,
  });
});

/**
 * GET /api/v1/backgrounds/:id/image
 *
 * Serves the actual background image file.
 * Requires authentication and ownership.
 */
export const getBackgroundImage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.id;

  const background = await prisma.backgroundImage.findFirst({
    where: {
      id: imageId,
      ownerId: userId,
      isActive: true,
    },
    select: {
      storagePath: true,
      mimeType: true,
      fileName: true,
    },
  });

  if (!background) {
    return res.status(404).json({
      success: false,
      message: 'Background image not found.',
    });
  }

  // Verify file exists
  if (!existsSync(background.storagePath)) {
    console.error(`Background image file missing: ${background.storagePath}`);
    return res.status(404).json({
      success: false,
      message: 'Background image file not found on server.',
    });
  }

  // Set appropriate headers
  res.setHeader('Content-Type', background.mimeType);
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${background.fileName}"`,
  );
  res.setHeader('Cache-Control', 'private, max-age=3600'); // Cache for 1 hour

  // Stream the file with error handling
  const stream = createReadStream(background.storagePath);
  stream.on('error', (err) => {
    console.error(`Error streaming background image: ${err.message}`);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error reading background image file.',
      });
    }
  });
  stream.pipe(res);
});

export default {
  getBackgrounds,
  uploadBackground,
  deleteBackground,
  getBackground,
  getBackgroundImage,
};
