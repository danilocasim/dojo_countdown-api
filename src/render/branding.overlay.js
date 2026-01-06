// ===========================================
// Branding Overlay
// ===========================================
// Renders branding watermark for free tier users.
//
// WHY BRANDING:
// - Monetization through visibility
// - Encourages upgrades to paid plans
// - Brand awareness

/**
 * Branding configuration.
 */
export const BRANDING_CONFIG = {
  text: "Powered by DojoCountdown",
  fontFamily: "Arial",
  fontSize: 10,
  color: "rgba(255, 255, 255, 0.6)",
  position: "bottom-right", // 'bottom-right' | 'bottom-left' | 'bottom-center'
  padding: 8,
};

/**
 * Renders branding overlay on canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} layout - Layout dimensions from layout engine
 * @param {Object} options - Branding options
 */
export const renderBranding = (ctx, layout, options = {}) => {
  const config = { ...BRANDING_CONFIG, ...options };
  const { text, fontFamily, fontSize, color, position, padding } = config;

  // Save context state
  ctx.save();

  // Set font
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "bottom";

  // Measure text
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;

  // Calculate position
  let x, y;
  y = layout.canvas.height - padding;

  switch (position) {
    case "bottom-left":
      ctx.textAlign = "left";
      x = padding;
      break;
    case "bottom-center":
      ctx.textAlign = "center";
      x = layout.canvas.width / 2;
      break;
    case "bottom-right":
    default:
      ctx.textAlign = "right";
      x = layout.canvas.width - padding;
      break;
  }

  // Draw text with subtle shadow for visibility
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.fillText(text, x, y);

  // Restore context state
  ctx.restore();
};

/**
 * Checks if branding should be shown based on plan.
 *
 * @param {string} plan - User's plan
 * @param {Object} styleConfig - Style configuration
 * @returns {boolean} Whether to show branding
 */
export const shouldShowBranding = (plan, styleConfig = {}) => {
  // Free users always have branding
  if (plan === "FREE") {
    return true;
  }

  // Paid users can control branding
  return styleConfig.showBranding ?? false;
};

export default {
  BRANDING_CONFIG,
  renderBranding,
  shouldShowBranding,
};
