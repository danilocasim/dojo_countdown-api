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
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
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
