// ===========================================
// Expired State Renderer
// ===========================================
// Renders expired countdown state with visual treatment.
//
// WHY SEPARATE RENDERER:
// - Different visual treatment for expired state
// - Clear user communication
// - Deterministic rendering without DB updates

import { darkenColor, grayscaleColor } from "./layout.engine.js";

/**
 * Expired state configuration.
 */
export const EXPIRED_CONFIG = {
  message: "EXPIRED",
  subMessage: "This countdown has ended",
  showSubMessage: true,
  visualTreatment: "dim", // 'dim' | 'grayscale' | 'accent'
  dimAmount: 0.4,
  messageFontSize: 48,
  subMessageFontSize: 14,
};

/**
 * Applies expired visual treatment to style config.
 *
 * @param {Object} style - Original style configuration
 * @param {Object} options - Expired treatment options
 * @returns {Object} Modified style for expired state
 */
export const applyExpiredTreatment = (style, options = {}) => {
  const config = { ...EXPIRED_CONFIG, ...options };
  const { visualTreatment, dimAmount } = config;

  const modifiedStyle = { ...style };

  switch (visualTreatment) {
    case "grayscale":
      modifiedStyle.backgroundColor = grayscaleColor(style.backgroundColor);
      modifiedStyle.fontColor = grayscaleColor(style.fontColor);
      modifiedStyle.accentColor = grayscaleColor(style.accentColor);
      break;

    case "accent":
      // Use accent color as background hint
      modifiedStyle.backgroundColor = darkenColor(style.accentColor, 0.7);
      break;

    case "dim":
    default:
      modifiedStyle.backgroundColor = darkenColor(
        style.backgroundColor,
        dimAmount
      );
      modifiedStyle.fontColor = darkenColor(style.fontColor, dimAmount * 0.5);
      break;
  }

  return modifiedStyle;
};

/**
 * Renders expired state overlay on canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions
 * @param {Object} style - Style configuration
 * @param {Object} options - Expired rendering options
 */
export const renderExpiredState = (ctx, layout, style, options = {}) => {
  const config = { ...EXPIRED_CONFIG, ...options };
  const {
    message,
    subMessage,
    showSubMessage,
    messageFontSize,
    subMessageFontSize,
  } = config;

  const { width, height } = layout.canvas;
  const centerX = width / 2;
  const centerY = height / 2;

  // Save context state
  ctx.save();

  // Draw main message
  ctx.font = `bold ${messageFontSize}px ${style.fontFamily}`;
  ctx.fillStyle = style.accentColor || "#e94560";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Add text shadow for emphasis
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  const messageY = showSubMessage ? centerY - 15 : centerY;
  ctx.fillText(message, centerX, messageY);

  // Draw sub message if enabled
  if (showSubMessage && subMessage) {
    ctx.font = `${subMessageFontSize}px ${style.fontFamily}`;
    ctx.fillStyle = style.labelColor || "#888888";
    ctx.shadowBlur = 0;
    ctx.fillText(subMessage, centerX, messageY + messageFontSize * 0.7);
  }

  // Restore context state
  ctx.restore();
};

/**
 * Gets custom expired message from countdown config.
 *
 * @param {Object} countdown - Countdown object
 * @returns {Object} Expired message configuration
 */
export const getExpiredMessage = (countdown) => {
  const styleConfig = countdown.styleConfig || {};

  return {
    message: styleConfig.expiredMessage || EXPIRED_CONFIG.message,
    subMessage: styleConfig.expiredSubMessage || EXPIRED_CONFIG.subMessage,
    showSubMessage:
      styleConfig.showExpiredSubMessage ?? EXPIRED_CONFIG.showSubMessage,
  };
};

export default {
  EXPIRED_CONFIG,
  applyExpiredTreatment,
  renderExpiredState,
  getExpiredMessage,
};
