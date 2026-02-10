// ===========================================
// Background Image Loader
// ===========================================
// Loads and caches background images for countdown rendering.
// Handles aspect-ratio safe rendering with cover/contain modes.

import { loadImage } from 'canvas';
import fs from 'fs';
import prisma from './prisma.js';

// In-memory cache for loaded images (limited size)
const imageCache = new Map();
const MAX_CACHE_SIZE = 50;

/**
 * Loads a background image by ID for a specific user.
 * Validates ownership and returns the loaded canvas Image.
 *
 * @param {string} imageId - Background image database ID
 * @param {string} userId - Owner user ID (for validation)
 * @returns {Promise<{image: Image, width: number, height: number}|null>} Loaded image or null
 */
export const loadBackgroundImage = async (imageId, userId) => {
  if (!imageId || !userId) {
    return null;
  }

  // Check cache first
  const cacheKey = `${userId}:${imageId}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    // Look up the background image in database
    const backgroundImage = await prisma.backgroundImage.findFirst({
      where: {
        id: imageId,
        ownerId: userId,
        isActive: true,
      },
    });

    if (!backgroundImage) {
      console.warn(`Background image not found: ${imageId} for user ${userId}`);
      return null;
    }

    // Verify file exists
    if (!fs.existsSync(backgroundImage.storagePath)) {
      console.warn(
        `Background image file not found: ${backgroundImage.storagePath}`,
      );
      return null;
    }

    // Load the image
    const image = await loadImage(backgroundImage.storagePath);

    const result = {
      image,
      width: backgroundImage.width,
      height: backgroundImage.height,
    };

    // Add to cache (evict oldest if full)
    if (imageCache.size >= MAX_CACHE_SIZE) {
      const firstKey = imageCache.keys().next().value;
      imageCache.delete(firstKey);
    }
    imageCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error(`Failed to load background image ${imageId}:`, error.message);
    return null;
  }
};

/**
 * Clears a specific image from the cache.
 * Call this when an image is deleted.
 *
 * @param {string} imageId - Background image database ID
 * @param {string} userId - Owner user ID
 */
export const clearImageFromCache = (imageId, userId) => {
  const cacheKey = `${userId}:${imageId}`;
  imageCache.delete(cacheKey);
};

/**
 * Clears all images for a user from the cache.
 *
 * @param {string} userId - User ID
 */
export const clearUserImagesFromCache = (userId) => {
  for (const key of imageCache.keys()) {
    if (key.startsWith(`${userId}:`)) {
      imageCache.delete(key);
    }
  }
};

/**
 * Calculates the draw parameters for aspect-ratio safe rendering.
 * Uses "cover" mode: scales image to cover the entire area while maintaining aspect ratio.
 *
 * @param {number} imageWidth - Original image width
 * @param {number} imageHeight - Original image height
 * @param {number} canvasWidth - Target canvas width
 * @param {number} canvasHeight - Target canvas height
 * @returns {{sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number}}
 */
export const calculateCoverDimensions = (
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
) => {
  const imageRatio = imageWidth / imageHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let sx, sy, sWidth, sHeight;

  if (imageRatio > canvasRatio) {
    // Image is wider than canvas (relative to height)
    // Crop sides, use full height
    sHeight = imageHeight;
    sWidth = imageHeight * canvasRatio;
    sx = (imageWidth - sWidth) / 2;
    sy = 0;
  } else {
    // Image is taller than canvas (relative to width)
    // Crop top/bottom, use full width
    sWidth = imageWidth;
    sHeight = imageWidth / canvasRatio;
    sx = 0;
    sy = (imageHeight - sHeight) / 2;
  }

  return {
    sx,
    sy,
    sWidth,
    sHeight,
    dx: 0,
    dy: 0,
    dWidth: canvasWidth,
    dHeight: canvasHeight,
  };
};

/**
 * Calculates the draw parameters for aspect-ratio safe rendering.
 * Uses "contain" mode: scales image to fit entirely within the area while maintaining aspect ratio.
 *
 * @param {number} imageWidth - Original image width
 * @param {number} imageHeight - Original image height
 * @param {number} canvasWidth - Target canvas width
 * @param {number} canvasHeight - Target canvas height
 * @returns {{sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number}}
 */
export const calculateContainDimensions = (
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
) => {
  const imageRatio = imageWidth / imageHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let dWidth, dHeight, dx, dy;

  if (imageRatio > canvasRatio) {
    // Image is wider than canvas (relative to height)
    // Fit to width, center vertically
    dWidth = canvasWidth;
    dHeight = canvasWidth / imageRatio;
    dx = 0;
    dy = (canvasHeight - dHeight) / 2;
  } else {
    // Image is taller than canvas (relative to width)
    // Fit to height, center horizontally
    dHeight = canvasHeight;
    dWidth = canvasHeight * imageRatio;
    dx = (canvasWidth - dWidth) / 2;
    dy = 0;
  }

  return {
    sx: 0,
    sy: 0,
    sWidth: imageWidth,
    sHeight: imageHeight,
    dx,
    dy,
    dWidth,
    dHeight,
  };
};

/**
 * Draws a background image onto a canvas context with aspect-ratio safe rendering.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {Image} image - Loaded canvas Image
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {string} mode - 'cover' (default) or 'contain'
 */
export const drawBackgroundImage = (
  ctx,
  image,
  canvasWidth,
  canvasHeight,
  mode = 'cover',
) => {
  const imageWidth = image.width;
  const imageHeight = image.height;

  const dims =
    mode === 'contain'
      ? calculateContainDimensions(
          imageWidth,
          imageHeight,
          canvasWidth,
          canvasHeight,
        )
      : calculateCoverDimensions(
          imageWidth,
          imageHeight,
          canvasWidth,
          canvasHeight,
        );

  ctx.drawImage(
    image,
    dims.sx,
    dims.sy,
    dims.sWidth,
    dims.sHeight,
    dims.dx,
    dims.dy,
    dims.dWidth,
    dims.dHeight,
  );
};

export default {
  loadBackgroundImage,
  clearImageFromCache,
  clearUserImagesFromCache,
  calculateCoverDimensions,
  calculateContainDimensions,
  drawBackgroundImage,
};
