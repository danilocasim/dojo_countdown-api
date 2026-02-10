// ===========================================
// Centralized Configuration
// ===========================================
// All environment variables and configuration values
// are centralized here for easy management and validation.
//
// WHY: Centralizing config provides:
// - Single source of truth for all settings
// - Early validation of required variables
// - Type coercion and defaults
// - Easy mocking in tests

/**
 * Application configuration object.
 * All values are derived from environment variables with sensible defaults.
 */
const config = {
  // Server
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  // Bcrypt
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    renderMax: parseInt(process.env.RENDER_RATE_LIMIT_MAX, 10) || 300, // per minute
    renderBurstMax: parseInt(process.env.RENDER_BURST_LIMIT_MAX, 10) || 60, // per 10s
  },

  // CDN
  cdn: {
    enabled: process.env.CDN_ENABLED === "true",
    baseUrl: process.env.CDN_BASE_URL || "",
    staleWhileRevalidate: parseInt(process.env.CDN_STALE_WHILE_REVALIDATE, 10) || 2,
  },

  // Abuse Detection
  abuse: {
    windowSeconds: parseInt(process.env.ABUSE_WINDOW_SECONDS, 10) || 60,
    maxUniqueKeys: parseInt(process.env.ABUSE_MAX_UNIQUE_KEYS, 10) || 50,
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    // Maps Stripe Price IDs to internal plan names
    priceToplan: {
      [process.env.STRIPE_PRICE_BOOTSTRAP]: "BOOTSTRAP",
      [process.env.STRIPE_PRICE_STARTUP]: "STARTUP",
      [process.env.STRIPE_PRICE_ENTERPRISE]: "ENTERPRISE",
    },
    // Maps internal plan names to Stripe Price IDs
    planToPrice: {
      BOOTSTRAP: process.env.STRIPE_PRICE_BOOTSTRAP,
      STARTUP: process.env.STRIPE_PRICE_STARTUP,
      ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE,
    },
  },
};

/**
 * Validates that all required configuration values are present.
 * Throws an error if any required values are missing.
 *
 * WHY: Fail fast on startup if config is invalid,
 * rather than failing later during runtime.
 */
export const validateConfig = () => {
  const required = [
    ["DATABASE_URL", config.databaseUrl],
    ["JWT_ACCESS_SECRET", config.jwt.accessSecret],
    ["JWT_REFRESH_SECRET", config.jwt.refreshSecret],
  ];

  const missing = required.filter(([name, value]) => !value);

  if (missing.length > 0) {
    const missingNames = missing.map(([name]) => name).join(", ");
    throw new Error(`Missing required environment variables: ${missingNames}`);
  }

  // Warn about insecure defaults in production
  if (config.env === "production") {
    if (config.jwt.accessSecret.includes("change-in-production")) {
      console.warn(
        "⚠️  WARNING: Using default JWT_ACCESS_SECRET in production!"
      );
    }
    if (config.jwt.refreshSecret.includes("change-in-production")) {
      console.warn(
        "⚠️  WARNING: Using default JWT_REFRESH_SECRET in production!"
      );
    }
  }
};

export default config;
