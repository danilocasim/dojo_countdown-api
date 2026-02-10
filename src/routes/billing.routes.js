// ===========================================
// Billing Routes
// ===========================================
// Defines billing/subscription endpoints.
//
// NOTE: The webhook route does NOT use authenticate middleware —
// it receives requests directly from Stripe, not from our frontend.

import { Router } from "express";
import express from "express";
import * as billingController from "../controllers/billing.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// ===========================================
// Webhook endpoint (no auth, raw body)
// ===========================================
// WHY express.raw(): Stripe signature verification needs the
// raw request body. If JSON-parsed first, verification fails.
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  billingController.handleWebhook
);

// ===========================================
// Authenticated billing endpoints
// ===========================================
router.use(authenticate);

/**
 * @route   POST /api/v1/billing/checkout
 * @desc    Create Stripe Checkout session for plan upgrade
 * @access  Private
 */
router.post("/checkout", billingController.createCheckout);

/**
 * @route   GET /api/v1/billing/portal
 * @desc    Create Stripe Customer Portal session
 * @access  Private
 */
router.get("/portal", billingController.createPortal);

/**
 * @route   GET /api/v1/billing/status
 * @desc    Get current billing status
 * @access  Private
 */
router.get("/status", billingController.getBillingStatus);

export default router;
