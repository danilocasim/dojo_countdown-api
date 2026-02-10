// ===========================================
// Billing Controller
// ===========================================
// Handles HTTP requests for Stripe billing operations.
// Controllers are thin — business logic lives in billing.service.js.

import Stripe from 'stripe';
import * as billingService from '../services/billing.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import config from '../config/index.js';
import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';

const stripe = new Stripe(config.stripe.secretKey);

/**
 * POST /api/v1/billing/checkout
 *
 * Creates a Stripe Checkout session and returns the URL.
 * Requires authentication.
 */
export const createCheckout = asyncHandler(async (req, res) => {
  const { priceId } = req.body;

  if (!priceId) {
    throw new BadRequestError('priceId is required');
  }

  // Fetch full user with billing fields (req.user from auth middleware only selects a subset)
  const fullUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, stripeCustomerId: true },
  });

  const url = await billingService.createCheckoutSession(fullUser, priceId);

  res.json({
    success: true,
    data: { url },
  });
});

/**
 * POST /api/v1/billing/webhook
 *
 * Stripe webhook endpoint. Receives events and dispatches to handlers.
 *
 * WHY RAW BODY:
 * - Stripe signature verification requires the raw request body
 * - express.json() parses it before we can verify, so we use
 *   express.raw() on this route specifically
 */
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw buffer from express.raw()
      sig,
      config.stripe.webhookSecret,
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  console.log(`[Webhook] Received event: ${event.type}, id: ${event.id}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log(`[Webhook] Processing checkout.session.completed`);
        console.log(
          `[Webhook] Session customer: ${event.data.object.customer}, metadata:`,
          event.data.object.metadata,
        );
        await billingService.handleCheckoutCompleted(event.data.object);
        break;

      case 'customer.subscription.created':
        console.log(`[Webhook] Processing customer.subscription.created`);
        console.log(
          `[Webhook] Subscription: ${event.data.object.id}, customer: ${event.data.object.customer}`,
        );
        console.log(
          `[Webhook] Price: ${event.data.object.items?.data?.[0]?.price?.id}`,
        );
        await billingService.handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        console.log(`[Webhook] Processing customer.subscription.updated`);
        console.log(
          `[Webhook] Subscription: ${event.data.object.id}, customer: ${event.data.object.customer}`,
        );
        console.log(
          `[Webhook] Price: ${event.data.object.items?.data?.[0]?.price?.id}, status: ${event.data.object.status}`,
        );
        await billingService.handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        console.log(`[Webhook] Processing customer.subscription.deleted`);
        await billingService.handleSubscriptionDeleted(event.data.object);
        break;

      default:
        // Unhandled event type — acknowledge receipt
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
        break;
    }
    console.log(`[Webhook] ✅ Successfully processed ${event.type}`);
  } catch (err) {
    // Log the full error for debugging
    console.error(`[Webhook] ❌ Handler error for ${event.type}:`, err);
    console.error(`[Webhook] Error stack:`, err.stack);
    // Still return 200 to prevent Stripe retries for app-level errors.
    // Stripe retries on non-2xx, which could cause duplicate processing.
    console.error(`Webhook handler error for ${event.type}:`, err);
  }

  // Always return 200 to acknowledge receipt
  res.json({ received: true });
};

/**
 * GET /api/v1/billing/portal
 *
 * Creates a Stripe Customer Portal session and returns the URL.
 * Requires authentication.
 */
export const createPortal = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, stripeCustomerId: true },
  });

  const url = await billingService.createPortalSession(user);

  res.json({
    success: true,
    data: { url },
  });
});

/**
 * GET /api/v1/billing/status
 *
 * Returns the user's current billing status.
 * Requires authentication.
 */
export const getBillingStatus = asyncHandler(async (req, res) => {
  const status = await billingService.getBillingStatus(req.user.id);

  res.json({
    success: true,
    data: status,
  });
});

export default {
  createCheckout,
  handleWebhook,
  createPortal,
  getBillingStatus,
};
