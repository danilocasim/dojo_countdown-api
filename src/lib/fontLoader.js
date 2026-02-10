// ===========================================
// Font Loader for Node Canvas
// ===========================================
// Registers TTF/OTF fonts for server-side canvas rendering.
// Supports both preset fonts and user-uploaded custom fonts.

import { registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { FONT_CATALOG } from '../config/fonts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track registered fonts (preset and custom)
const registeredFonts = new Set();
const customFontRegistry = new Map(); // fontId -> { familyName, storagePath }

// Path to TTF fonts directory (preset fonts)
const FONTS_DIR = path.resolve(__dirname, '../../assets/fonts');

// Map font IDs to their TTF file names (preset fonts)
const TTF_FILES = {
  inter: 'inter-bold.ttf',
  roboto: 'roboto-bold.ttf',
  poppins: 'poppins-bold.ttf',
  montserrat: 'montserrat-bold.ttf',
  opensans: 'open-sans-bold.ttf',
  jetbrains: 'jetbrains-mono-bold.ttf',
  lato: 'lato-bold.ttf',
  oswald: 'oswald.ttf',
};

// ===========================================
// Preset Font Registration
// ===========================================

/**
 * Registers a preset TTF font with node-canvas.
 */
const registerTtfFont = (fontId, familyName) => {
  const fontKey = fontId + '-bold';

  if (registeredFonts.has(fontKey)) {
    return true;
  }

  const ttfFile = TTF_FILES[fontId];
  if (!ttfFile) {
    console.warn('No TTF file mapping for font: ' + fontId);
    return false;
  }

  const fontPath = path.join(FONTS_DIR, ttfFile);
  if (!fs.existsSync(fontPath)) {
    console.warn('TTF file not found: ' + fontPath);
    return false;
  }

  try {
    registerFont(fontPath, {
      family: familyName,
      weight: 'bold',
    });
    registeredFonts.add(fontKey);
    console.log('✓ Registered TTF font: ' + familyName + ' from ' + ttfFile);
    return true;
  } catch (error) {
    console.error('Failed to register font ' + fontId + ':', error.message);
    return false;
  }
};

/**
 * Loads all preset fonts from the catalog.
 * Call this once at server startup.
 */
export const loadAllFonts = async () => {
  console.log('Loading TTF fonts for canvas rendering...');
  console.log('Fonts directory: ' + FONTS_DIR);

  if (!fs.existsSync(FONTS_DIR)) {
    console.error('Fonts directory not found: ' + FONTS_DIR);
    return;
  }

  const availableFiles = fs.readdirSync(FONTS_DIR);
  console.log('Available TTF files: ' + availableFiles.join(', '));

  for (const font of FONT_CATALOG) {
    registerTtfFont(font.id, font.name);
  }

  console.log(
    'Font loading complete. ' + registeredFonts.size + ' fonts registered.',
  );
};

// ===========================================
// Custom Font Registration
// ===========================================

/**
 * Registers a custom user-uploaded font with node-canvas.
 * Called when a user uploads a font or when rendering requires it.
 *
 * @param {string} fontId - Custom font database ID
 * @param {string} storagePath - Path to the font file
 * @param {string} displayName - User-friendly font name
 * @returns {boolean} True if registration succeeded
 */
export const registerCustomFont = async (fontId, storagePath, displayName) => {
  const fontKey = 'custom-' + fontId;

  if (registeredFonts.has(fontKey)) {
    return true; // Already registered
  }

  if (!fs.existsSync(storagePath)) {
    console.warn('Custom font file not found: ' + storagePath);
    return false;
  }

  try {
    // Use the fontId as the family name to ensure uniqueness
    const familyName = 'CustomFont-' + fontId;

    registerFont(storagePath, {
      family: familyName,
      weight: 'bold',
    });

    registeredFonts.add(fontKey);
    customFontRegistry.set(fontId, { familyName, storagePath, displayName });

    console.log(
      '✓ Registered custom font: ' + displayName + ' (id: ' + fontId + ')',
    );
    return true;
  } catch (error) {
    console.error(
      'Failed to register custom font ' + fontId + ':',
      error.message,
    );
    return false;
  }
};

/**
 * Unregisters a custom font (removes from tracking).
 * Note: node-canvas doesn't support unregistering fonts at runtime,
 * but we remove it from our registry to prevent future use.
 *
 * @param {string} fontId - Custom font database ID
 */
export const unregisterCustomFont = (fontId) => {
  const fontKey = 'custom-' + fontId;
  registeredFonts.delete(fontKey);
  customFontRegistry.delete(fontId);
};

/**
 * Checks if a custom font is registered.
 *
 * @param {string} fontId - Custom font database ID
 * @returns {boolean} True if registered
 */
export const isCustomFontRegistered = (fontId) => {
  return registeredFonts.has('custom-' + fontId);
};

/**
 * Gets the canvas family name for a custom font.
 *
 * @param {string} fontId - Custom font database ID
 * @returns {string|null} Canvas family name or null if not registered
 */
export const getCustomFontFamily = (fontId) => {
  const entry = customFontRegistry.get(fontId);
  return entry ? entry.familyName : null;
};

// ===========================================
// Unified Font Resolver
// ===========================================

/**
 * Gets the font family name to use in canvas.
 * Handles both preset and custom fonts.
 *
 * @param {string} fontSource - 'preset' or 'custom'
 * @param {string} fontId - Font identifier
 * @returns {string} Canvas font family name (falls back to Arial)
 */
export const getCanvasFontFamily = (fontId, fontSource = 'preset') => {
  // Handle custom fonts
  if (fontSource === 'custom') {
    const customFamily = getCustomFontFamily(fontId);
    if (customFamily) {
      return customFamily;
    }
    // Custom font not registered - fall back to Arial
    console.warn(
      'Custom font not registered: ' + fontId + ', falling back to Arial',
    );
    return 'Arial';
  }

  // Handle preset fonts
  const font = FONT_CATALOG.find((f) => f.id === fontId);

  if (!font) {
    return 'Arial';
  }

  const hasFont = registeredFonts.has(fontId + '-bold');
  return hasFont ? font.name : 'Arial';
};

/**
 * Ensures a custom font is loaded before rendering.
 * Loads from database if needed.
 *
 * @param {string} fontId - Custom font database ID
 * @param {Object} prisma - Prisma client instance
 * @returns {Promise<string>} Canvas font family name (falls back to Arial)
 */
export const ensureCustomFontLoaded = async (fontId, prisma) => {
  // Check if already registered
  if (isCustomFontRegistered(fontId)) {
    return getCustomFontFamily(fontId);
  }

  // Load from database
  try {
    const font = await prisma.customFont.findUnique({
      where: { id: fontId },
      select: { id: true, storagePath: true, name: true, isActive: true },
    });

    if (!font || !font.isActive) {
      console.warn('Custom font not found or inactive: ' + fontId);
      return 'Arial';
    }

    // Register the font
    const success = await registerCustomFont(
      fontId,
      font.storagePath,
      font.name,
    );
    if (success) {
      return getCustomFontFamily(fontId);
    }
  } catch (error) {
    console.error('Failed to load custom font: ' + fontId, error.message);
  }

  return 'Arial';
};

export const areFontsLoaded = () => registeredFonts.size > 0;

export default {
  loadAllFonts,
  getCanvasFontFamily,
  areFontsLoaded,
  registerCustomFont,
  unregisterCustomFont,
  isCustomFontRegistered,
  getCustomFontFamily,
  ensureCustomFontLoaded,
};
