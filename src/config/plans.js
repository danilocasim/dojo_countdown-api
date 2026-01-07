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
 * Used by planLimits middleware and usage service to enforce restrictions.
 *
 * Monthly view limits match MotionMail-style pricing:
 * - FREE: 20,000 views/month
 * - BOOTSTRAP: 100,000 views/month
 * - STARTUP: 700,000 views/month
 * - ENTERPRISE: 2,800,000 views/month
 */
export const PLAN_LIMITS = {
  FREE: {
    maxActiveCountdowns: 10,
    monthlyViews: 20_000,
    countdownDurationDays: 30,
    customization: false,
    removeBranding: false,
    apiAccess: false,
    analytics: false,
    priority: "low",
  },

  BOOTSTRAP: {
    maxActiveCountdowns: 100,
    monthlyViews: 100_000,
    countdownDurationDays: 90,
    customization: true,
    removeBranding: false,
    apiAccess: false,
    analytics: true,
    priority: "normal",
  },

  STARTUP: {
    maxActiveCountdowns: 500,
    monthlyViews: 700_000,
    countdownDurationDays: 365,
    customization: true,
    removeBranding: true,
    apiAccess: true,
    analytics: true,
    priority: "high",
  },

  ENTERPRISE: {
    maxActiveCountdowns: Infinity,
    monthlyViews: 2_800_000,
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
 * @param {string} plan - Plan name (FREE, BOOTSTRAP, STARTUP, ENTERPRISE)
 * @returns {Object} Plan limits object
 */
export const getPlanLimits = (plan) => {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
};

/**
 * Get monthly view limit for a plan.
 *
 * @param {string} plan - Plan name
 * @returns {number} Monthly view limit
 */
export const getMonthlyViewLimit = (plan) => {
  const limits = getPlanLimits(plan);
  return limits.monthlyViews;
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
