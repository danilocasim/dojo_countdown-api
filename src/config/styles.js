// ===========================================
// Style Configuration Constants
// ===========================================
// Centralized style defaults and design definitions.
//
// WHY CENTRALIZED:
// - Single source of truth for all style defaults
// - Easy to modify without touching rendering logic
// - Ensures consistent fallbacks across the system

/**
 * Available design variants.
 * Each design has different visual representation.
 */
export const DESIGN_VARIANTS = {
  CIRCLE: "circle", // Circular units (like MotionMail style 1)
  BLOCK: "block", // Square blocks (default, like MotionMail style 2)
  MINIMAL: "minimal", // Simple text blocks (like MotionMail style 3)
  PILL: "pill", // Rounded pill-style bar (like MotionMail style 4)
};

/**
 * List of valid design values for validation.
 */
export const VALID_DESIGNS = Object.values(DESIGN_VARIANTS);

/**
 * Default style configuration.
 * Used when styleConfig is null, empty, or missing fields.
 */
export const DEFAULT_STYLE = {
  design: DESIGN_VARIANTS.BLOCK,
  colors: {
    design: "#000000", // Main countdown shape color
    text: "#FFFFFF", // Digits and labels
    backdrop: "#FFFFFF", // Background color
  },
  noBackdrop: false,

  // Additional layout options (with defaults)
  showLabels: true,
  labelStyle: "short", // 'short' | 'full' | 'none'
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  showSeparators: true,
  separatorChar: ":",

  // Branding (controlled by plan)
  showBranding: true,
};

/**
 * Design-specific dimension configurations.
 * Each design variant has its own sizing rules.
 */
export const DESIGN_DIMENSIONS = {
  [DESIGN_VARIANTS.CIRCLE]: {
    width: 600,
    height: 200,
    unitSize: 80, // Diameter of each circle
    unitGap: 20, // Gap between circles
    fontSize: 36,
    labelFontSize: 12,
  },
  [DESIGN_VARIANTS.BLOCK]: {
    width: 600,
    height: 200,
    unitSize: 80, // Width/height of each block
    unitGap: 15,
    fontSize: 48,
    labelFontSize: 14,
  },
  [DESIGN_VARIANTS.MINIMAL]: {
    width: 500,
    height: 120,
    unitSize: 60,
    unitGap: 10,
    fontSize: 42,
    labelFontSize: 12,
  },
  [DESIGN_VARIANTS.PILL]: {
    width: 500,
    height: 80,
    unitSize: 0, // Not used for pill
    unitGap: 0,
    fontSize: 36,
    labelFontSize: 0, // No labels in pill design
    borderRadius: 40,
    padding: 20,
  },
};

/**
 * Validates a hex color string.
 *
 * @param {string} color - Color to validate
 * @returns {boolean} True if valid hex color
 */
export const isValidHexColor = (color) => {
  if (typeof color !== "string") return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Normalizes and merges style config with defaults.
 * Ensures all required fields exist with valid values.
 *
 * WHY THIS APPROACH:
 * - No rendering should ever fail due to missing config
 * - Invalid values are silently replaced with defaults
 * - Backward compatible with older countdown records
 *
 * @param {Object|null} styleConfig - User's style configuration
 * @returns {Object} Normalized style configuration
 */
export const normalizeStyleConfig = (styleConfig) => {
  // Start with defaults
  const normalized = {
    ...DEFAULT_STYLE,
    colors: { ...DEFAULT_STYLE.colors },
  };

  // If no config provided, return defaults
  if (!styleConfig || typeof styleConfig !== "object") {
    return normalized;
  }

  // Validate and apply design
  if (styleConfig.design && VALID_DESIGNS.includes(styleConfig.design)) {
    normalized.design = styleConfig.design;
  }

  // Validate and apply colors
  if (styleConfig.colors && typeof styleConfig.colors === "object") {
    if (isValidHexColor(styleConfig.colors.design)) {
      normalized.colors.design = styleConfig.colors.design;
    }
    if (isValidHexColor(styleConfig.colors.text)) {
      normalized.colors.text = styleConfig.colors.text;
    }
    if (isValidHexColor(styleConfig.colors.backdrop)) {
      normalized.colors.backdrop = styleConfig.colors.backdrop;
    }
  }

  // Handle legacy color fields (backward compatibility)
  if (isValidHexColor(styleConfig.backgroundColor)) {
    normalized.colors.backdrop = styleConfig.backgroundColor;
  }
  if (isValidHexColor(styleConfig.fontColor)) {
    normalized.colors.text = styleConfig.fontColor;
  }
  if (isValidHexColor(styleConfig.accentColor)) {
    normalized.colors.design = styleConfig.accentColor;
  }

  // Apply noBackdrop
  if (typeof styleConfig.noBackdrop === "boolean") {
    normalized.noBackdrop = styleConfig.noBackdrop;
  }

  // Apply display options
  if (typeof styleConfig.showLabels === "boolean") {
    normalized.showLabels = styleConfig.showLabels;
  }
  if (
    styleConfig.labelStyle &&
    ["short", "full", "none"].includes(styleConfig.labelStyle)
  ) {
    normalized.labelStyle = styleConfig.labelStyle;
  }
  if (typeof styleConfig.showDays === "boolean") {
    normalized.showDays = styleConfig.showDays;
  }
  if (typeof styleConfig.showHours === "boolean") {
    normalized.showHours = styleConfig.showHours;
  }
  if (typeof styleConfig.showMinutes === "boolean") {
    normalized.showMinutes = styleConfig.showMinutes;
  }
  if (typeof styleConfig.showSeconds === "boolean") {
    normalized.showSeconds = styleConfig.showSeconds;
  }
  if (typeof styleConfig.showSeparators === "boolean") {
    normalized.showSeparators = styleConfig.showSeparators;
  }
  if (typeof styleConfig.separatorChar === "string") {
    normalized.separatorChar = styleConfig.separatorChar.slice(0, 1) || ":";
  }
  if (typeof styleConfig.showBranding === "boolean") {
    normalized.showBranding = styleConfig.showBranding;
  }

  return normalized;
};

/**
 * Gets dimensions for a specific design variant.
 *
 * @param {string} design - Design variant name
 * @returns {Object} Dimension configuration
 */
export const getDesignDimensions = (design) => {
  return DESIGN_DIMENSIONS[design] || DESIGN_DIMENSIONS[DESIGN_VARIANTS.BLOCK];
};

export default {
  DESIGN_VARIANTS,
  VALID_DESIGNS,
  DEFAULT_STYLE,
  DESIGN_DIMENSIONS,
  isValidHexColor,
  normalizeStyleConfig,
  getDesignDimensions,
};
