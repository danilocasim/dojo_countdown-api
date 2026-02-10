// ===========================================
// Billing Routes (PayMongo)
// ===========================================
// Defines billing/subscription endpoints for PayMongo integration.
//
// NOTE: The webhook route does NOT use authenticate middleware —
// it receives requests directly from PayMongo, not from our frontend.

import { Router } from "express";
import express from "express";
import * as billingController from "../controllers/billing.paymongo.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// ===========================================
// Webhook endpoint (no auth, raw body)
// ===========================================
// WHY express.raw(): PayMongo signature verification needs the
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
 * @route   POST /api/v1/billing/prepare
 * @desc    Prepare subscription (create customer, return customerId)
 * @access  Private
 */
router.post("/prepare", billingController.prepareSubscription);

/**
 * @route   POST /api/v1/billing/subscribe
 * @desc    Create subscription with payment method attached
 * @access  Private
 */
router.post("/subscribe", billingController.createSubscription);

/**
 * @route   POST /api/v1/billing/complete
 * @desc    Complete subscription after payment
 * @access  Private
 */
router.post("/complete", billingController.completeSubscription);

/**
 * @route   POST /api/v1/billing/change-plan
 * @desc    Change subscription plan
 * @access  Private
 */
router.post("/change-plan", billingController.changePlan);

/**
 * @route   POST /api/v1/billing/cancel
 * @desc    Cancel subscription
 * @access  Private
 */
router.post("/cancel", billingController.cancelSubscription);

/**
 * @route   GET /api/v1/billing/status
 * @desc    Get current billing status
 * @access  Private
 */
router.get("/status", billingController.getBillingStatus);

/**
 * @route   GET /api/v1/billing/subscription
 * @desc    Get current subscription details
 * @access  Private
 */
router.get("/subscription", billingController.getSubscription);

export default router;
