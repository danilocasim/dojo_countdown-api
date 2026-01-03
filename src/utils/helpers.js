// ===========================================
// Utility Helper Functions
// ===========================================
// Common utility functions used across the application.

/**
 * Removes specified keys from an object.
 * Useful for removing sensitive fields before sending responses.
 *
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to remove
 * @returns {Object} New object without specified keys
 */
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

/**
 * Picks specified keys from an object.
 * Useful for whitelisting fields.
 *
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to keep
 * @returns {Object} New object with only specified keys
 */
export const pick = (obj, keys) => {
  const result = {};
  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Delays execution for specified milliseconds.
 * Useful for testing and rate limiting.
 *
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random string of specified length.
 * Useful for tokens and IDs.
 *
 * @param {number} length - Length of string to generate
 * @returns {string} Random string
 */
export const randomString = (length = 32) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Parses duration string to milliseconds.
 * Supports: s (seconds), m (minutes), h (hours), d (days)
 *
 * @param {string} duration - Duration string (e.g., "15m", "7d")
 * @returns {number} Milliseconds
 */
export const parseDuration = (duration) => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
};

/**
 * Formats bytes to human readable string.
 *
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string (e.g., "1.5 MB")
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Checks if a date is in the past.
 *
 * @param {Date} date - Date to check
 * @returns {boolean}
 */
export const isExpired = (date) => {
  return new Date(date) < new Date();
};

/**
 * Calculates days until a date.
 *
 * @param {Date} date - Target date
 * @returns {number} Days until date (negative if past)
 */
export const daysUntil = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default {
  omit,
  pick,
  delay,
  randomString,
  parseDuration,
  formatBytes,
  isExpired,
  daysUntil,
};
