// ===========================================
// Font Configuration
// ===========================================
// Centralized font catalog for countdown rendering.
// Only fonts in this whitelist can be used.
//
// WHY WHITELIST:
// - Security: Prevents arbitrary font injection
// - Performance: Pre-loaded fonts can be cached
// - Consistency: Known fonts work across all renders
// - No uploads: Simpler architecture, no storage needed

/**
 * Available fonts for countdown rendering.
 * Each font has:
 * - id: Unique identifier (used in styleConfig)
 * - name: Display name for UI
 * - family: CSS font-family value
 * - weights: Available font weights
 * - category: Font category (sans-serif, serif, monospace)
 */
export const FONT_CATALOG = [
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter, sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
    isDefault: true,
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: 'Roboto, sans-serif',
    weights: [400, 500, 700],
    category: 'sans-serif',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins, sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat, sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
  },
  {
    id: 'opensans',
    name: 'Open Sans',
    family: 'Open Sans, sans-serif',
    weights: [400, 600, 700],
    category: 'sans-serif',
  },
  {
    id: 'jetbrains',
    name: 'JetBrains Mono',
    family: 'JetBrains Mono, monospace',
    weights: [400, 500, 700],
    category: 'monospace',
  },
  {
    id: 'lato',
    name: 'Lato',
    family: 'Lato, sans-serif',
    weights: [400, 700],
    category: 'sans-serif',
  },
  {
    id: 'oswald',
    name: 'Oswald',
    family: 'Oswald, sans-serif',
    weights: [400, 500, 600, 700],
    category: 'sans-serif',
  },
];

/**
 * List of valid font IDs for validation.
 */
export const VALID_FONT_IDS = FONT_CATALOG.map((f) => f.id);

/**
 * Default font configuration.
 */
export const DEFAULT_FONT =
  FONT_CATALOG.find((f) => f.isDefault) || FONT_CATALOG[0];
export const DEFAULT_FONT_ID = DEFAULT_FONT.id;

/**
 * Gets font configuration by ID.
 * Returns default font if ID is invalid.
 *
 * @param {string} fontId - Font identifier
 * @returns {Object} Font configuration
 */
export const getFontById = (fontId) => {
  if (!fontId || typeof fontId !== 'string') {
    return DEFAULT_FONT;
  }

  const font = FONT_CATALOG.find((f) => f.id === fontId);
  return font || DEFAULT_FONT;
};

/**
 * Validates a font ID.
 *
 * @param {string} fontId - Font ID to validate
 * @returns {boolean} True if valid
 */
export const isValidFontId = (fontId) => {
  return VALID_FONT_IDS.includes(fontId);
};

/**
 * Gets the CSS font-family string for a font ID.
 * Falls back to default if invalid.
 *
 * @param {string} fontId - Font identifier
 * @returns {string} CSS font-family value
 */
export const getFontFamily = (fontId) => {
  const font = getFontById(fontId);
  return font.family;
};

/**
 * Gets fonts grouped by category for UI display.
 *
 * @returns {Object} Fonts grouped by category
 */
export const getFontsByCategory = () => {
  return FONT_CATALOG.reduce((acc, font) => {
    const category = font.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(font);
    return acc;
  }, {});
};

export default {
  FONT_CATALOG,
  VALID_FONT_IDS,
  DEFAULT_FONT,
  DEFAULT_FONT_ID,
  getFontById,
  isValidFontId,
  getFontFamily,
  getFontsByCategory,
};
