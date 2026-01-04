// ===========================================
// Plan Limits Configuration
// ===========================================
// Defines feature limits and capabilities for each plan tier.
//
// WHY: Centralizing plan limits provides:
// - Single source of truth for feature gating
// - Easy adjustment of limits without code changes
// - Clear documentation of plan differences
// - Middleware can reference these for enforcement

/**
 * Plan limits by tier.
 * Used by planLimits middleware to enforce restrictions.
 */
export const PLAN_LIMITS = {
  FREE: {
    maxActiveCountdowns: 3,
    monthlyViews: 1000,
    countdownDurationDays: 30, // Max days countdown can run
    customization: false, // Custom colors, fonts
    removeBranding: false, // DojoCountdown watermark
    apiAccess: false, // Direct API access
    analytics: false, // View analytics
    priority: "low", // Render priority
  },

  STARTER: {
    maxActiveCountdowns: 10,
    monthlyViews: 10000,
    countdownDurationDays: 90,
    customization: true,
    removeBranding: false,
    apiAccess: false,
    analytics: true,
    priority: "normal",
  },

  PRO: {
    maxActiveCountdowns: 50,
    monthlyViews: 100000,
    countdownDurationDays: 365,
    customization: true,
    removeBranding: true,
    apiAccess: true,
    analytics: true,
    priority: "high",
  },

  ENTERPRISE: {
    maxActiveCountdowns: Infinity,
    monthlyViews: Infinity,
    countdownDurationDays: Infinity,
    customization: true,
    removeBranding: true,
    apiAccess: true,
    analytics: true,
    priority: "highest",
  },
};

/**
 * Default style configuration for countdowns.
 */
export const DEFAULT_COUNTDOWN_STYLE = {
  fontFamily: "Arial, sans-serif",
  fontSize: 48,
  fontColor: "#FFFFFF",
  backgroundColor: "#1a1a2e",
  accentColor: "#e94560",
  layout: "horizontal",
  showLabels: true,
  labelStyle: "short",
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  padding: 20,
  borderRadius: 8,
  showBranding: true,
};

/**
 * Get limits for a specific plan.
 *
 * @param {string} plan - Plan name (FREE, STARTER, PRO, ENTERPRISE)
 * @returns {Object} Plan limits object
 */
export const getPlanLimits = (plan) => {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
};

/**
 * Check if a user has exceeded a specific limit.
 *
 * @param {string} plan - User's plan
 * @param {string} limitKey - Key of the limit to check
 * @param {number} currentValue - Current usage value
 * @returns {boolean} True if limit exceeded
 */
export const isLimitExceeded = (plan, limitKey, currentValue) => {
  const limits = getPlanLimits(plan);
  const limit = limits[limitKey];

  if (limit === Infinity) return false;
  return currentValue >= limit;
};

/**
 * Get remaining quota for a specific limit.
 *
 * @param {string} plan - User's plan
 * @param {string} limitKey - Key of the limit to check
 * @param {number} currentValue - Current usage value
 * @returns {number} Remaining quota (Infinity for unlimited)
 */
export const getRemainingQuota = (plan, limitKey, currentValue) => {
  const limits = getPlanLimits(plan);
  const limit = limits[limitKey];

  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - currentValue);
};

/**
 * Check if a feature is available for a plan.
 *
 * @param {string} plan - User's plan
 * @param {string} feature - Feature key
 * @returns {boolean} True if feature is available
 */
export const hasFeature = (plan, feature) => {
  const limits = getPlanLimits(plan);
  return !!limits[feature];
};

export default PLAN_LIMITS;
