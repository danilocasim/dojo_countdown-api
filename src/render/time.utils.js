// ===========================================
// Time Calculation Utilities
// ===========================================
// Pure functions for countdown time calculations.
// These are stateless and unit-testable.
//
// WHY PURE FUNCTIONS:
// - Deterministic output for same input
// - Easy to test in isolation
// - No side effects
// - Shared across renderer and API

/**
 * Calculates remaining time until a target date.
 *
 * @param {Date|string} endAt - Target end date
 * @param {string} timezone - IANA timezone (e.g., 'America/New_York')
 * @returns {Object} Time breakdown and metadata
 */
export const calculateRemainingTime = (endAt, timezone = "UTC") => {
  const now = new Date();
  const end = new Date(endAt);

  // Calculate difference in milliseconds
  const diffMs = end.getTime() - now.getTime();

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
    labelStyle = "short", // 'short' | 'full' | 'none'
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
 * Gets the current time in a specific timezone.
 *
 * @param {string} timezone - IANA timezone
 * @returns {Date} Current time in timezone
 */
export const getCurrentTimeInTimezone = (timezone) => {
  try {
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

    const parts = formatter.formatToParts(new Date());
    const values = {};
    parts.forEach((part) => {
      values[part.type] = part.value;
    });

    return new Date(
      `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`
    );
  } catch (error) {
    // Fallback to UTC if timezone is invalid
    return new Date();
  }
};

export default {
  calculateRemainingTime,
  padZero,
  formatTimeSegments,
  getCurrentTimeInTimezone,
};
