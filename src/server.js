// ===========================================
// Server Entry Point
// ===========================================
// This is the main entry point for the DojoCountdown application.
// It loads environment variables, initializes the database connection,
// and starts the HTTP server.
//
// WHY SEPARATE FROM APP.JS?
// - Environment configuration happens here before app loads
// - Database connection is established before server starts
// - Graceful shutdown handling is centralized
// - App.js stays focused on Express configuration

import dotenv from 'dotenv';

// ===========================================
// Load Environment Variables FIRST
// Before any other imports that might need them
// ===========================================
dotenv.config();

import app from './app.js';
import prisma from './lib/prisma.js';

// ===========================================
// Configuration
// ===========================================
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

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
    // Verify Database Connection
    // ===========================================
    console.log('🔌 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // ===========================================
    // Start HTTP Server
    // ===========================================
    server = app.listen(PORT, () => {
      console.log('═══════════════════════════════════════════');
      console.log('🚀 DojoCountdown Server');
      console.log('═══════════════════════════════════════════');
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════════');
    });

    // ===========================================
    // Graceful Shutdown Handlers
    // ===========================================
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

/**
 * Gracefully shuts down the server.
 * 
 * WHY: Ensures in-flight requests complete and database
 * connections are properly closed before exiting.
 * Critical for:
 * - Kubernetes pod termination
 * - Docker container shutdown
 * - Production deployments
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n📴 Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  if (server) {
    server.close(async () => {
      console.log('🔒 HTTP server closed');

      try {
        // Disconnect from database
        await prisma.$disconnect();
        console.log('🔌 Database disconnected');
        console.log('👋 Shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });

    // Force shutdown after 10 seconds if graceful shutdown hangs
    setTimeout(() => {
      console.error('⚠️ Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

/**
 * Handle unhandled promise rejections.
 * 
 * WHY: Prevents the server from running in an undefined state.
 * Logs the error and initiates graceful shutdown.
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  // Don't crash immediately - let graceful shutdown handle it
  gracefulShutdown('UNHANDLED_REJECTION');
});

/**
 * Handle uncaught exceptions.
 * 
 * WHY: These are programming errors that leave the app in an
 * undefined state. Log and exit immediately.
 */
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// ===========================================
// Start the Server
// ===========================================
startServer();
