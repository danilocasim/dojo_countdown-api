// ===========================================
// Layout Engine
// ===========================================
// Data-driven layout system for countdown rendering.
// Supports multiple design variants with different layouts.

import {
  DESIGN_VARIANTS,
  DEFAULT_STYLE,
  getDesignDimensions,
  normalizeStyleConfig,
} from "../config/styles.js";

/**
 * Merges user style config with defaults.
 * Now delegates to centralized normalizeStyleConfig.
 *
 * @param {Object} userConfig - User's style configuration
 * @returns {Object} Merged configuration
 */
export const mergeStyleConfig = (userConfig = {}) => {
  return normalizeStyleConfig(userConfig);
};

/**
 * Calculates layout dimensions based on design variant.
 *
 * @param {Object} style - Normalized style configuration
 * @param {number} segmentCount - Number of time segments to display
 * @returns {Object} Layout dimensions and positions
 */
export const calculateLayout = (style, segmentCount) => {
  const design = style.design || DESIGN_VARIANTS.BLOCK;
  const dimensions = getDesignDimensions(design);

  // Route to design-specific layout calculator
  switch (design) {
    case DESIGN_VARIANTS.CIRCLE:
      return calculateCircleLayout(style, segmentCount, dimensions);
    case DESIGN_VARIANTS.MINIMAL:
      return calculateMinimalLayout(style, segmentCount, dimensions);
    case DESIGN_VARIANTS.PILL:
      return calculatePillLayout(style, segmentCount, dimensions);
    case DESIGN_VARIANTS.BLOCK:
    default:
      return calculateBlockLayout(style, segmentCount, dimensions);
  }
};

/**
 * Calculates layout for BLOCK design (default).
 * Square blocks with numbers inside.
 */
const calculateBlockLayout = (style, segmentCount, dimensions) => {
  const { width, height, unitSize, unitGap, fontSize, labelFontSize } =
    dimensions;
  const { showLabels, showBranding, noBackdrop } = style;

  const totalWidth = segmentCount * unitSize + (segmentCount - 1) * unitGap;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const x = startX + i * (unitSize + unitGap);
    segments.push({
      x: x + unitSize / 2,
      y: centerY,
      width: unitSize,
      height: unitSize,
      valueY: showLabels ? centerY - 5 : centerY,
      labelY: centerY + unitSize / 2 + labelFontSize + 5,
      unitX: x,
      unitY: centerY - unitSize / 2,
    });
  }

  return {
    design: DESIGN_VARIANTS.BLOCK,
    canvas: { width, height },
    segments,
    separators: calculateSeparators(segments, style, fontSize, centerY),
    branding: { x: width - 10, y: height - 10 },
    dimensions: { fontSize, labelFontSize, unitSize },
    noBackdrop,
  };
};

/**
 * Calculates layout for CIRCLE design.
 * Circular units with numbers inside.
 */
const calculateCircleLayout = (style, segmentCount, dimensions) => {
  const { width, height, unitSize, unitGap, fontSize, labelFontSize } =
    dimensions;
  const { showLabels, noBackdrop } = style;

  const totalWidth = segmentCount * unitSize + (segmentCount - 1) * unitGap;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const x = startX + i * (unitSize + unitGap);
    segments.push({
      x: x + unitSize / 2,
      y: centerY,
      width: unitSize,
      height: unitSize,
      radius: unitSize / 2,
      valueY: showLabels ? centerY - 3 : centerY,
      labelY: centerY + unitSize / 2 + labelFontSize + 8,
      unitX: x,
      unitY: centerY - unitSize / 2,
    });
  }

  return {
    design: DESIGN_VARIANTS.CIRCLE,
    canvas: { width, height },
    segments,
    separators: [], // No separators in circle design
    branding: { x: width - 10, y: height - 10 },
    dimensions: { fontSize, labelFontSize, unitSize },
    noBackdrop,
  };
};

/**
 * Calculates layout for MINIMAL design.
 * Simple text with minimal styling.
 */
const calculateMinimalLayout = (style, segmentCount, dimensions) => {
  const { width, height, unitGap, fontSize, labelFontSize } = dimensions;
  const { showLabels, noBackdrop } = style;

  const unitWidth = 50;
  const totalWidth = segmentCount * unitWidth + (segmentCount - 1) * unitGap;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const x = startX + i * (unitWidth + unitGap);
    segments.push({
      x: x + unitWidth / 2,
      y: centerY,
      width: unitWidth,
      height: fontSize + 10,
      valueY: showLabels ? centerY - 8 : centerY,
      labelY: centerY + fontSize / 2 + 5,
      minimal: true,
    });
  }

  return {
    design: DESIGN_VARIANTS.MINIMAL,
    canvas: { width, height },
    segments,
    separators: calculateSeparators(segments, style, fontSize, centerY - 8),
    branding: { x: width - 10, y: height - 10 },
    dimensions: { fontSize, labelFontSize },
    noBackdrop,
  };
};

/**
 * Calculates layout for PILL design.
 * Single rounded bar with all numbers.
 */
const calculatePillLayout = (style, segmentCount, dimensions) => {
  const { width, height, fontSize, borderRadius, padding } = dimensions;
  const { noBackdrop } = style;

  const pillWidth = width - padding * 2;
  const pillHeight = height - padding * 2;
  const unitWidth = pillWidth / segmentCount;
  const centerY = height / 2;

  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const x = padding + i * unitWidth;
    segments.push({
      x: x + unitWidth / 2,
      y: centerY,
      width: unitWidth,
      height: pillHeight,
      valueY: centerY,
      labelY: centerY, // No labels in pill
      pill: true,
    });
  }

  return {
    design: DESIGN_VARIANTS.PILL,
    canvas: { width, height },
    pill: {
      x: padding,
      y: padding,
      width: pillWidth,
      height: pillHeight,
      borderRadius,
    },
    segments,
    separators: calculatePillSeparators(segments, style, pillHeight, padding),
    branding: { x: width - 10, y: height - 10 },
    dimensions: { fontSize, borderRadius },
    noBackdrop,
  };
};

/**
 * Calculates separator positions for block/minimal designs.
 */
const calculateSeparators = (segments, style, fontSize, y) => {
  if (!style.showSeparators || segments.length < 2) {
    return [];
  }

  const separators = [];
  for (let i = 0; i < segments.length - 1; i++) {
    const seg1 = segments[i];
    const seg2 = segments[i + 1];
    separators.push({
      x: (seg1.x + seg2.x) / 2,
      y,
      fontSize,
    });
  }
  return separators;
};

/**
 * Calculates separator positions for pill design (vertical lines).
 */
const calculatePillSeparators = (segments, style, pillHeight, padding) => {
  if (segments.length < 2) return [];

  const separators = [];
  for (let i = 0; i < segments.length - 1; i++) {
    const seg1 = segments[i];
    const seg2 = segments[i + 1];
    separators.push({
      x: (seg1.x + seg1.width / 2 + seg2.x - seg2.width / 2) / 2,
      y1: padding + 10,
      y2: padding + pillHeight - 10,
      vertical: true,
    });
  }
  return separators;
};

/**
 * Parses color string and returns rgba components.
 */
export const parseColor = (color) => {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b, a: 1 };
  }

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

  return { r: 0, g: 0, b: 0, a: 1 };
};

/**
 * Darkens a color for expired state.
 */
export const darkenColor = (color, amount = 0.5) => {
  const { r, g, b, a } = parseColor(color);
  const darken = (c) => Math.round(c * (1 - amount));
  return `rgba(${darken(r)}, ${darken(g)}, ${darken(b)}, ${a})`;
};

/**
 * Converts color to grayscale.
 */
export const grayscaleColor = (color) => {
  const { r, g, b, a } = parseColor(color);
  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  return `rgba(${gray}, ${gray}, ${gray}, ${a})`;
};

export { DESIGN_VARIANTS, DEFAULT_STYLE };

export default {
  mergeStyleConfig,
  calculateLayout,
  parseColor,
  darkenColor,
  grayscaleColor,
};
