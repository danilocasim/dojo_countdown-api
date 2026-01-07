// ===========================================
// Quota Exceeded Renderer
// ===========================================
// Renders a static "quota exceeded" image when user
// has surpassed their monthly view limit.
//
// WHY IMAGE INSTEAD OF HTTP 429:
// - Email clients can't handle HTTP errors gracefully
// - Shows user a meaningful message
// - Maintains email layout integrity
// - Includes branding for upgrade CTA

import { createCanvas } from "canvas";

/**
 * Default quota exceeded image configuration.
 */
const QUOTA_CONFIG = {
  width: 600,
  height: 200,
  backgroundColor: "#2d2d2d",
  textColor: "#ffffff",
  accentColor: "#e94560",
  fontFamily: "Arial",
};

/**
 * Renders a quota exceeded image.
 *
 * @param {Object} options - Rendering options
 * @returns {Buffer} PNG image buffer
 */
export const renderQuotaExceeded = (options = {}) => {
  const config = { ...QUOTA_CONFIG, ...options };
  const { width, height, backgroundColor, textColor, accentColor, fontFamily } =
    config;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Draw accent bar at top
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, width, 4);

  // Draw main message
  ctx.fillStyle = textColor;
  ctx.font = `bold 28px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Monthly View Limit Reached", width / 2, height / 2 - 25);

  // Draw sub message
  ctx.font = `16px ${fontFamily}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText(
    "Upgrade your plan to continue showing countdowns",
    width / 2,
    height / 2 + 15
  );

  // Draw branding
  ctx.font = `11px ${fontFamily}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText("Powered by DojoCountdown", width - 10, height - 10);

  return canvas.toBuffer("image/png");
};

/**
 * Renders a quota warning image (near limit).
 *
 * @param {Object} options - Rendering options
 * @returns {Buffer} PNG image buffer
 */
export const renderQuotaWarning = (options = {}) => {
  const config = { ...QUOTA_CONFIG, ...options };
  const { width, height, backgroundColor, textColor, fontFamily } = config;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Draw warning bar at top (yellow/orange)
  ctx.fillStyle = "#f39c12";
  ctx.fillRect(0, 0, width, 4);

  // Draw warning message
  ctx.fillStyle = textColor;
  ctx.font = `bold 20px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚠️ Approaching Monthly View Limit", width / 2, height / 2 - 15);

  // Draw sub message
  ctx.font = `14px ${fontFamily}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText(
    "Consider upgrading to avoid interruption",
    width / 2,
    height / 2 + 15
  );

  return canvas.toBuffer("image/png");
};

/**
 * Pre-generated quota exceeded image buffer.
 * Cached for performance - no need to re-render each time.
 */
let cachedQuotaExceededImage = null;

/**
 * Gets the quota exceeded image (cached).
 *
 * @returns {Buffer} PNG image buffer
 */
export const getQuotaExceededImage = () => {
  if (!cachedQuotaExceededImage) {
    cachedQuotaExceededImage = renderQuotaExceeded();
  }
  return cachedQuotaExceededImage;
};

/**
 * Clears the cached quota exceeded image.
 * Call this if you need to regenerate with different config.
 */
export const clearQuotaCache = () => {
  cachedQuotaExceededImage = null;
};

export default {
  renderQuotaExceeded,
  renderQuotaWarning,
  getQuotaExceededImage,
  clearQuotaCache,
};
