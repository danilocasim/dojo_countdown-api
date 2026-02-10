// ===========================================
// Billing Controller (PayMongo)
// ===========================================
// Handles HTTP requests for PayMongo billing operations.
// Controllers are thin — business logic lives in billing.paymongo.service.js.
//
// KEY DIFFERENCES FROM STRIPE:
// - No hosted checkout redirect - returns payment intent for frontend
// - No customer portal - provides cancel/change endpoints instead
// - Different webhook event structure

import * as billingService from '../services/billing.paymongo.service.js';
import * as paymongo from '../lib/paymongo.js';
import asyncHandler from '../utils/asyncHandler.js';
import config from '../config/index.js';
import prisma from '../lib/prisma.js';
import { BadRequestError } from '../utils/errors.js';

/**
 * POST /api/v1/billing/prepare
 *
 * Prepares subscription by creating/fetching customer.
 * Returns customerId for frontend to create payment method.
 * 
 * FLOW:
 * 1. Frontend calls /prepare → gets customerId
 * 2. Frontend creates payment method via PayMongo.js
 * 3. Frontend calls /subscribe with paymentMethodId
 */
export const prepareSubscription = asyncHandler(async (req, res) => {
  const { planId } = req.body;

  if (!planId) {
    throw new BadRequestError('planId is required');
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, paymongoCustomerId: true },
  });

  const result = await billingService.prepareSubscription(fullUser, planId);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/v1/billing/subscribe
 *
 * Creates subscription with payment method attached.
 * Called after frontend creates payment method via PayMongo.js
 */
export const createSubscription = asyncHandler(async (req, res) => {
  const { planId, paymentMethodId } = req.body;

  if (!planId) {
    throw new BadRequestError('planId is required');
  }

  if (!paymentMethodId) {
    throw new BadRequestError('paymentMethodId is required');
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, paymongoCustomerId: true },
  });

  const result = await billingService.createSubscriptionWithPayment(fullUser, planId, paymentMethodId);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/v1/billing/complete
 *
 * Completes subscription after successful payment.
 * Called from frontend after payment method attachment.
 */
export const completeSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    throw new BadRequestError('subscriptionId is required');
  }

  const result = await billingService.completeSubscription(req.user.id, subscriptionId);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/v1/billing/change-plan
 *
 * Changes the user's subscription plan.
 * Takes effect on next billing cycle.
 */
export const changePlan = asyncHandler(async (req, res) => {
  const { planId } = req.body;

  if (!planId) {
    throw new BadRequestError('planId is required');
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, paymongoSubscriptionId: true, subscriptionStatus: true },
  });

  const result = await billingService.changePlan(user, planId);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/v1/billing/cancel
 *
 * Cancels the user's subscription.
 * Takes effect immediately.
 */
export const cancelSubscription = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, paymongoSubscriptionId: true, subscriptionStatus: true },
  });

  const result = await billingService.cancelSubscription(user);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * POST /api/v1/billing/webhook
 *
 * PayMongo webhook endpoint. Receives events and dispatches to handlers.
 *
 * WHY RAW BODY:
 * - PayMongo signature verification requires the raw request body
 * - express.json() parses it before we can verify
 */
export const handleWebhook = async (req, res) => {
  const signature = req.headers['paymongo-signature'];

  // Verify webhook signature
  const rawBody = req.body.toString('utf8');
  const isValid = paymongo.verifyWebhookSignature(
    rawBody,
    signature,
    config.paymongo.webhookSecret
  );

  if (!isValid) {
    console.error('[Webhook] Invalid signature');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error('[Webhook] Invalid JSON payload');
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const eventType = event.data?.attributes?.type;
  const eventData = event.data?.attributes?.data;

  console.log(`[Webhook] Received event: ${eventType}, id: ${event.data?.id}`);

  try {
    switch (eventType) {
      // Subscription events
      case 'subscription.activated':
        console.log('[Webhook] Processing subscription.activated');
        await billingService.handleSubscriptionActivated(eventData);
        break;

      case 'subscription.updated':
        console.log('[Webhook] Processing subscription.updated');
        await billingService.handleSubscriptionUpdated(eventData);
        break;

      case 'subscription.past_due':
        console.log('[Webhook] Processing subscription.past_due');
        await billingService.handleSubscriptionPastDue(eventData);
        break;

      case 'subscription.unpaid':
        console.log('[Webhook] Processing subscription.unpaid');
        await billingService.handleSubscriptionUnpaid(eventData);
        break;

      // Invoice events
      case 'subscription.invoice.paid':
        console.log('[Webhook] Processing subscription.invoice.paid');
        await billingService.handleInvoicePaid(eventData);
        break;

      case 'subscription.invoice.payment_failed':
        console.log('[Webhook] Processing subscription.invoice.payment_failed');
        await billingService.handleInvoicePaymentFailed(eventData);
        break;

      default:
        console.log(`[Webhook] Unhandled event type: ${eventType}`);
        break;
    }
    console.log(`[Webhook] ✅ Successfully processed ${eventType}`);
  } catch (err) {
    console.error(`[Webhook] ❌ Handler error for ${eventType}:`, err);
    console.error(`[Webhook] Error stack:`, err.stack);
  }

  // Always return 200 to acknowledge receipt
  res.json({ received: true });
};

/**
 * GET /api/v1/billing/status
 *
 * Returns the user's current billing status.
 */
export const getBillingStatus = asyncHandler(async (req, res) => {
  const status = await billingService.getBillingStatus(req.user.id);

  res.json({
    success: true,
    data: status,
  });
});

/**
 * GET /api/v1/billing/subscription
 *
 * Returns current subscription details from PayMongo.
 */
export const getSubscription = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { paymongoSubscriptionId: true },
  });

  if (!user?.paymongoSubscriptionId) {
    return res.json({
      success: true,
      data: null,
    });
  }

  const subscription = await paymongo.getSubscription(user.paymongoSubscriptionId);

  res.json({
    success: true,
    data: {
      id: subscription.id,
      status: subscription.attributes.status,
      planId: subscription.attributes.plan_id,
      nextBillingDate: subscription.attributes.next_billing_schedule 
        ? new Date(subscription.attributes.next_billing_schedule * 1000)
        : null,
    },
  });
});

export default {
  prepareSubscription,
  createSubscription,
  completeSubscription,
  changePlan,
  cancelSubscription,
  handleWebhook,
  getBillingStatus,
  getSubscription,
};
