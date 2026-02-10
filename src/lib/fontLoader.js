// ===========================================
// Font Loader for Node Canvas
// ===========================================
// Registers TTF fonts for server-side canvas rendering.
// Node-canvas requires TTF files (not woff/woff2).

import { registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { FONT_CATALOG } from '../config/fonts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track registered fonts
const registeredFonts = new Set();

// Path to TTF fonts directory
const FONTS_DIR = path.resolve(__dirname, '../../assets/fonts');

// Map font IDs to their TTF file names
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

/**
 * Registers a TTF font with node-canvas.
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
 * Loads all fonts from the catalog.
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

/**
 * Gets the font family name to use in canvas.
 */
export const getCanvasFontFamily = (fontId) => {
  const font = FONT_CATALOG.find((f) => f.id === fontId);

  if (!font) {
    return 'Arial';
  }

  const hasFont = registeredFonts.has(fontId + '-bold');
  return hasFont ? font.name : 'Arial';
};

export const areFontsLoaded = () => registeredFonts.size > 0;

export default { loadAllFonts, getCanvasFontFamily, areFontsLoaded };
