// ===========================================
// File Upload Middleware
// ===========================================
// Configures multer for font and image file uploads.
// Validates file types, size limits, and storage location.

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================================
// Configuration - Fonts
// ===========================================

const FONTS_STORAGE_DIR = path.resolve(__dirname, '../../storage/fonts');
const MAX_FONT_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit per font file
const ALLOWED_FONT_MIME_TYPES = [
  'font/ttf',
  'font/otf',
  'application/x-font-ttf',
  'application/x-font-otf',
];
const ALLOWED_FONT_EXTENSIONS = ['.ttf', '.otf'];

// ===========================================
// Configuration - Background Images
// ===========================================

const IMAGES_STORAGE_DIR = path.resolve(__dirname, '../../storage/images');
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit per image
const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Ensure storage directories exist
if (!fs.existsSync(FONTS_STORAGE_DIR)) {
  fs.mkdirSync(FONTS_STORAGE_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_STORAGE_DIR)) {
  fs.mkdirSync(IMAGES_STORAGE_DIR, { recursive: true });
}

// ===========================================
// Font Storage Configuration
// ===========================================

const fontStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store in user-specific subdirectory for organization
    const userId = req.user?.id;
    if (!userId) {
      return cb(new Error('User not authenticated'));
    }

    const userFontsDir = path.join(FONTS_STORAGE_DIR, userId);
    if (!fs.existsSync(userFontsDir)) {
      fs.mkdirSync(userFontsDir, { recursive: true });
    }

    cb(null, userFontsDir);
  },

  filename: (req, file, cb) => {
    // Generate unique filename: {randomId}_{timestamp}{extension}
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${uniqueId}_${timestamp}${ext}`;

    cb(null, filename);
  },
});

const fontFileFilter = (req, file, cb) => {
  // Check extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_FONT_EXTENSIONS.includes(ext)) {
    return cb(
      new Error(
        `Invalid file type. Only ${ALLOWED_FONT_EXTENSIONS.join(', ')} files are allowed.`,
      ),
      false,
    );
  }

  // Check MIME type (browsers may report different MIME types)
  const mimeType = file.mimetype.toLowerCase();
  const isValidMime =
    ALLOWED_FONT_MIME_TYPES.includes(mimeType) ||
    mimeType === 'application/octet-stream'; // Some browsers use this

  if (!isValidMime && !ALLOWED_FONT_EXTENSIONS.includes(ext)) {
    return cb(new Error('Invalid file type'), false);
  }

  cb(null, true);
};

export const fontUpload = multer({
  storage: fontStorage,
  fileFilter: fontFileFilter,
  limits: {
    fileSize: MAX_FONT_FILE_SIZE,
    files: 1, // Only allow one file per upload
  },
});

// ===========================================
// Image Storage Configuration
// ===========================================

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store in user-specific subdirectory for organization
    const userId = req.user?.id;
    if (!userId) {
      return cb(new Error('User not authenticated'));
    }

    const userImagesDir = path.join(IMAGES_STORAGE_DIR, userId);
    if (!fs.existsSync(userImagesDir)) {
      fs.mkdirSync(userImagesDir, { recursive: true });
    }

    cb(null, userImagesDir);
  },

  filename: (req, file, cb) => {
    // Generate unique filename: {randomId}_{timestamp}{extension}
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${uniqueId}_${timestamp}${ext}`;

    cb(null, filename);
  },
});

const imageFileFilter = (req, file, cb) => {
  // Check extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    return cb(
      new Error(
        `Invalid file type. Only ${ALLOWED_IMAGE_EXTENSIONS.join(', ')} files are allowed.`,
      ),
      false,
    );
  }

  // Check MIME type
  const mimeType = file.mimetype.toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
    return cb(
      new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed.'),
      false,
    );
  }

  cb(null, true);
};

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_IMAGE_FILE_SIZE,
    files: 1, // Only allow one file per upload
  },
});

// ===========================================
// Error Handler Middleware
// ===========================================

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Please upload a smaller file.',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Only one file can be uploaded at a time.',
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload failed.',
    });
  }

  next();
};

// ===========================================
// Utility Functions
// ===========================================

/**
 * Deletes a font file from storage.
 * @param {string} storagePath - Path to the font file
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteFontFile = async (storagePath) => {
  try {
    if (fs.existsSync(storagePath)) {
      await fs.promises.unlink(storagePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to delete font file:', error.message);
    return false;
  }
};

/**
 * Deletes an image file from storage.
 * @param {string} storagePath - Path to the image file
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteImageFile = async (storagePath) => {
  try {
    if (fs.existsSync(storagePath)) {
      await fs.promises.unlink(storagePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to delete image file:', error.message);
    return false;
  }
};

/**
 * Gets the full storage path for a font.
 * @param {string} userId - User ID
 * @param {string} filename - Font filename
 * @returns {string} Full path to the font file
 */
export const getFontStoragePath = (userId, filename) => {
  return path.join(FONTS_STORAGE_DIR, userId, filename);
};

/**
 * Gets the full storage path for an image.
 * @param {string} userId - User ID
 * @param {string} filename - Image filename
 * @returns {string} Full path to the image file
 */
export const getImageStoragePath = (userId, filename) => {
  return path.join(IMAGES_STORAGE_DIR, userId, filename);
};

export default {
  fontUpload,
  imageUpload,
  handleUploadError,
  deleteFontFile,
  deleteImageFile,
  getFontStoragePath,
  getImageStoragePath,
};
