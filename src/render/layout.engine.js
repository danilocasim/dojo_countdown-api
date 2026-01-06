// ===========================================
// Layout Engine
// ===========================================
// Data-driven layout system for countdown rendering.
// Accepts styleConfig and calculates dimensions/positions.
//
// WHY DATA-DRIVEN:
// - No hardcoded styles
// - User customization support
// - Plan-based feature gating
// - Easy to extend

/**
 * Default style configuration.
 * Used when user doesn't provide custom styles.
 */
export const DEFAULT_STYLE = {
  // Canvas dimensions
  width: 600,
  height: 200,

  // Colors
  backgroundColor: "#1a1a2e",
  fontColor: "#FFFFFF",
  accentColor: "#e94560",
  labelColor: "#888888",

  // Typography
  fontFamily: "Arial",
  fontSize: 64,
  labelFontSize: 14,

  // Layout
  layout: "horizontal", // 'horizontal' | 'vertical' | 'compact'
  alignment: "center", // 'left' | 'center' | 'right'
  padding: 20,
  segmentGap: 20,

  // Display options
  showLabels: true,
  labelStyle: "short",
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  showSeparators: true,
  separatorChar: ":",

  // Visual effects
  borderRadius: 0,
  shadowEnabled: false,
  shadowColor: "rgba(0,0,0,0.3)",
  shadowBlur: 10,

  // Branding
  showBranding: true,
};

/**
 * Merges user style config with defaults.
 *
 * @param {Object} userConfig - User's style configuration
 * @returns {Object} Merged configuration
 */
export const mergeStyleConfig = (userConfig = {}) => {
  return {
    ...DEFAULT_STYLE,
    ...userConfig,
  };
};

/**
 * Calculates layout dimensions based on style config.
 *
 * @param {Object} style - Merged style configuration
 * @param {number} segmentCount - Number of time segments to display
 * @returns {Object} Layout dimensions and positions
 */
export const calculateLayout = (style, segmentCount) => {
  const {
    width,
    height,
    padding,
    segmentGap,
    fontSize,
    labelFontSize,
    showLabels,
    showSeparators,
    layout,
    alignment,
    showBranding,
  } = style;

  // Calculate content area
  const contentWidth = width - padding * 2;
  const contentHeight = height - padding * 2 - (showBranding ? 25 : 0);

  // Calculate segment dimensions
  const separatorCount = showSeparators ? segmentCount - 1 : 0;
  const totalGapWidth = (segmentCount - 1) * segmentGap;
  const segmentWidth = (contentWidth - totalGapWidth) / segmentCount;

  // Calculate positions based on layout type
  let segments = [];

  if (layout === "horizontal") {
    const segmentHeight = showLabels ? fontSize + labelFontSize + 10 : fontSize;
    const startY = padding + (contentHeight - segmentHeight) / 2;

    for (let i = 0; i < segmentCount; i++) {
      const x = padding + i * (segmentWidth + segmentGap);
      segments.push({
        x: x + segmentWidth / 2, // Center of segment
        y: startY,
        width: segmentWidth,
        height: segmentHeight,
        valueY: startY + fontSize * 0.8,
        labelY: startY + fontSize + labelFontSize + 5,
      });
    }
  } else if (layout === "compact") {
    // Compact layout - all in one line with separators
    const totalWidth =
      segmentCount * fontSize * 1.5 + separatorCount * fontSize * 0.5;
    let startX = (width - totalWidth) / 2;
    const centerY = height / 2;

    for (let i = 0; i < segmentCount; i++) {
      segments.push({
        x: startX + fontSize * 0.75,
        y: centerY - fontSize / 2,
        width: fontSize * 1.5,
        height: fontSize,
        valueY: centerY + fontSize * 0.3,
        labelY: centerY + fontSize * 0.3,
        compact: true,
      });
      startX += fontSize * 1.5 + (showSeparators ? fontSize * 0.5 : segmentGap);
    }
  }

  // Calculate separator positions
  const separators = [];
  if (showSeparators && segments.length > 1) {
    for (let i = 0; i < segments.length - 1; i++) {
      const seg1 = segments[i];
      const seg2 = segments[i + 1];
      separators.push({
        x: (seg1.x + seg1.width / 2 + seg2.x - seg2.width / 2) / 2,
        y: seg1.valueY,
      });
    }
  }

  // Calculate branding position
  const brandingPosition = {
    x: width - padding - 10,
    y: height - 10,
  };

  return {
    canvas: { width, height },
    content: {
      width: contentWidth,
      height: contentHeight,
      x: padding,
      y: padding,
    },
    segments,
    separators,
    branding: brandingPosition,
  };
};

/**
 * Parses color string and returns rgba components.
 * Supports hex, rgb, rgba formats.
 *
 * @param {string} color - Color string
 * @returns {Object} RGBA components
 */
export const parseColor = (color) => {
  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const a = hex.length === 8 ? parseInt(hex.substr(6, 2), 16) / 255 : 1;
    return { r, g, b, a };
  }

  // Handle rgb/rgba
  const match = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : 1,
    };
  }

  // Default to black
  return { r: 0, g: 0, b: 0, a: 1 };
};

/**
 * Darkens a color for expired state.
 *
 * @param {string} color - Original color
 * @param {number} amount - Darken amount (0-1)
 * @returns {string} Darkened color
 */
export const darkenColor = (color, amount = 0.5) => {
  const { r, g, b, a } = parseColor(color);
  const darken = (c) => Math.round(c * (1 - amount));
  return `rgba(${darken(r)}, ${darken(g)}, ${darken(b)}, ${a})`;
};

/**
 * Converts color to grayscale.
 *
 * @param {string} color - Original color
 * @returns {string} Grayscale color
 */
export const grayscaleColor = (color) => {
  const { r, g, b, a } = parseColor(color);
  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  return `rgba(${gray}, ${gray}, ${gray}, ${a})`;
};

export default {
  DEFAULT_STYLE,
  mergeStyleConfig,
  calculateLayout,
  parseColor,
  darkenColor,
  grayscaleColor,
};
