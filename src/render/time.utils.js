// ===========================================
// Time Calculation Utilities
// ===========================================
// Pure functions for countdown time calculations.
//
// IMPORTANT: All endAt values should be stored as UTC in database.
// Timezone is only used for display purposes.

/**
 * Pads a number with leading zeros.
 *
 * @param {number} num - Number to pad
 * @param {number} length - Desired length
 * @returns {string} Padded string
 */
export const padZero = (num, length = 2) => {
  return String(num).padStart(length, "0");
};

/**
 * Calculates remaining time until a target date.
 * Assumes endAt is stored in UTC.
 *
 * @param {Date|string} endAt - Target end date (UTC)
 * @returns {Object} Time breakdown and metadata
 */
export const calculateRemainingTime = (endAt) => {
  const now = Date.now();
  const end = new Date(endAt).getTime();

  // Calculate difference in milliseconds
  const diffMs = end - now;

  // Check if expired
  if (diffMs <= 0) {
    return {
      isExpired: true,
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
    };
  }

  // Calculate time components
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    isExpired: false,
    totalMs: diffMs,
    days,
    hours,
    minutes,
    seconds,
    formatted: {
      days: padZero(days),
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(seconds),
    },
  };
};

/**
 * Formats time for display based on configuration.
 *
 * @param {Object} time - Time object from calculateRemainingTime
 * @param {Object} options - Display options
 * @returns {Array} Array of time segments for rendering
 */
export const formatTimeSegments = (time, options = {}) => {
  const {
    showDays = true,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
    labelStyle = "short",
  } = options;

  const labels = {
    short: { days: "D", hours: "H", minutes: "M", seconds: "S" },
    full: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    none: { days: "", hours: "", minutes: "", seconds: "" },
  };

  const currentLabels = labels[labelStyle] || labels.short;
  const segments = [];

  if (showDays) {
    segments.push({
      value: time.formatted.days,
      label: currentLabels.days,
      type: "days",
    });
  }

  if (showHours) {
    segments.push({
      value: time.formatted.hours,
      label: currentLabels.hours,
      type: "hours",
    });
  }

  if (showMinutes) {
    segments.push({
      value: time.formatted.minutes,
      label: currentLabels.minutes,
      type: "minutes",
    });
  }

  if (showSeconds) {
    segments.push({
      value: time.formatted.seconds,
      label: currentLabels.seconds,
      type: "seconds",
    });
  }

  return segments;
};

/**
 * Converts a local datetime string to UTC.
 * Used when creating/updating countdowns.
 *
 * @param {string} localDateStr - Local datetime string (e.g., "2025-01-15T12:00")
 * @param {string} timezone - IANA timezone (e.g., "Asia/Manila")
 * @returns {Date} UTC Date object
 */
export const localToUTC = (localDateStr, timezone) => {
  // If already has Z or offset (e.g., +08:00, -05:00), it's already UTC-aware
  // Just parse it directly - no conversion needed
  if (localDateStr.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(localDateStr)) {
    return new Date(localDateStr);
  }

  // No timezone info - interpret as local time in the specified timezone
  // Parse the local date string parts
  const [datePart, timePart] = localDateStr.includes("T")
    ? localDateStr.split("T")
    : [localDateStr, "00:00:00"];

  const [year, month, day] = datePart.split("-").map(Number);
  const timeParts = (timePart || "00:00:00").split(":");
  const hour = parseInt(timeParts[0]) || 0;
  const minute = parseInt(timeParts[1]) || 0;
  const second = parseInt(timeParts[2]) || 0;

  // Create formatter for the target timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Start with a UTC guess (same numbers but in UTC)
  let utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  // See what this UTC time looks like in the target timezone
  const parts = formatter.formatToParts(utcGuess);
  const values = {};
  parts.forEach((part) => {
    values[part.type] = parseInt(part.value) || 0;
  });

  // Calculate the offset between what we want and what we got
  const guessInTz = new Date(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second
  );
  const target = new Date(year, month - 1, day, hour, minute, second);

  // Offset is how much we need to adjust UTC
  const offsetMs = guessInTz.getTime() - target.getTime();

  // Subtract offset to get correct UTC time
  // If Manila (UTC+8) shows 20:00 when UTC is 12:00, offset is +8 hours
  // So to get 20:00 Manila in UTC, we subtract 8 hours: UTC 12:00
  return new Date(utcGuess.getTime() - offsetMs);
};

/**
 * Formats a UTC date for display in a specific timezone.
 * Used when showing countdown end time to users.
 *
 * @param {Date|string} utcDate - UTC date
 * @param {string} timezone - IANA timezone for display
 * @returns {string} Formatted date string
 */
export const formatInTimezone = (utcDate, timezone) => {
  const date = new Date(utcDate);

  return date.toLocaleString("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default {
  calculateRemainingTime,
  padZero,
  formatTimeSegments,
  localToUTC,
  formatInTimezone,
};
