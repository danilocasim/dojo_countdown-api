// ===========================================
// Prisma Client Singleton
// ===========================================
// This module exports a single Prisma client instance.
// Using a singleton pattern prevents creating multiple
// database connections during development hot-reloads.

import { PrismaClient } from "../../generated/prisma/index.js";

/**
 * Global Prisma client instance.
 * In development, we store the client on the global object
 * to prevent creating new instances on hot-reload.
 */
const globalForPrisma = globalThis;

/**
 * Prisma client with logging configuration based on environment.
 * - Development: Logs queries and errors for debugging
 * - Production: Logs only errors for performance
 */
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Store client on global object in development to survive hot-reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
