// ===========================================
// Server Entry Point
// ===========================================
// This is the main entry point for the DojoCountdown application.
// It loads environment variables, initializes the database connection,
// and starts the HTTP server.

import dotenv from "dotenv";

// ===========================================
// Load Environment Variables FIRST
// Before any other imports that might need them
// ===========================================
dotenv.config();

import app from "./app.js";
import prisma from "./lib/prisma.js";
import config, { validateConfig } from "./config/index.js";

// ===========================================
// Configuration
// ===========================================
const PORT = config.port;
const NODE_ENV = config.env;

// ===========================================
// Server Instance
// ===========================================
let server;

/**
 * Starts the HTTP server after verifying database connection.
 */
const startServer = async () => {
  try {
    // ===========================================
    // Validate Configuration
    // ===========================================
    console.log("🔧 Validating configuration...");
    validateConfig();
    console.log("✅ Configuration valid");

    // ===========================================
    // Verify Database Connection
    // ===========================================
    console.log("🔌 Connecting to database...");
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // ===========================================
    // Start HTTP Server
    // ===========================================
    server = app.listen(PORT, () => {
      console.log("═══════════════════════════════════════════");
      console.log("🚀 DojoCountdown Server");
      console.log("═══════════════════════════════════════════");
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth: http://localhost:${PORT}/api/v1/auth`);
      console.log(`⏱️  Countdowns: http://localhost:${PORT}/api/v1/countdowns`);
      console.log(`🖼️  Render: http://localhost:${PORT}/api/v1/render/:id`);
      console.log(`📊 Usage: http://localhost:${PORT}/api/v1/usage`);
      console.log("═══════════════════════════════════════════");
    });

    // ===========================================
    // Graceful Shutdown Handlers
    // ===========================================
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

/**
 * Gracefully shuts down the server.
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n📴 Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      console.log("🔒 HTTP server closed");

      try {
        await prisma.$disconnect();
        console.log("🔌 Database disconnected");
        console.log("👋 Shutdown complete");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
        process.exit(1);
      }
    });

    setTimeout(() => {
      console.error("⚠️ Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// ===========================================
// Start the Server
// ===========================================
startServer();
