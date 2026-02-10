// ===========================================
// Billing Service (PayMongo)
// ===========================================
// Handles PayMongo subscription lifecycle, plan transitions,
// and credit rollover logic.
//
// WHY THIS DESIGN:
// - Backend is source of truth for plan state
// - Plan changes only via verified PayMongo webhooks
// - Credit rollover in single DB transactions
// - Idempotent webhook handling (safe for retries)
//
// KEY DIFFERENCES FROM STRIPE:
// - PayMongo uses Payment Intent workflow for subscriptions
// - No customer portal - must build custom management UI
// - Subscription requires: create customer → create subscription → attach payment method
// - Different webhook event names

import prisma from '../lib/prisma.js';
import config from '../config/index.js';
import { getPlanLimits } from '../config/plans.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import * as paymongo from '../lib/paymongo.js';

// ===========================================
// Subscription Flow
// ===========================================

/**
 * Prepares subscription by ensuring customer exists.
 * Returns customerId for frontend to create payment method.
 *
 * FLOW:
 * 1. Backend: prepareSubscription → returns customerId, planId
 * 2. Frontend: Creates payment method via PayMongo.js
 * 3. Frontend: Calls createSubscription with paymentMethodId
 *
 * @param {Object} user - Authenticated user from req.user
 * @param {string} planId - PayMongo Plan ID for the target plan
 * @returns {Promise<Object>} Customer and plan info for frontend
 */
export const prepareSubscription = async (user, planId) => {
  const planName = config.paymongo.planIdToName[planId];
  if (!planName) {
    throw new BadRequestError('Invalid plan ID');
  }

  // Check if user already has an active subscription
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      paymongoSubscriptionId: true,
      subscriptionStatus: true,
      paymongoCustomerId: true,
      email: true,
      name: true,
    },
  });

  if (
    fullUser?.paymongoSubscriptionId &&
    fullUser?.subscriptionStatus === 'active'
  ) {
    throw new BadRequestError(
      'You already have an active subscription. Please cancel it first or use the change plan feature.',
    );
  }

  // Create or reuse PayMongo customer
  let customerId = fullUser?.paymongoCustomerId;

  if (!customerId) {
    // Split name into first/last name (PayMongo requires both)
    const nameParts = (fullUser.name || 'Customer').split(' ');
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    const customer = await paymongo.createCustomer({
      email: user.email || fullUser.email,
      firstName,
      lastName,
      metadata: { userId: user.id },
    });
    customerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { paymongoCustomerId: customerId },
    });
  }

  // Return info for frontend to create payment method
  return {
    customerId,
    planId,
    planName,
    userEmail: user.email || fullUser.email,
    userName: fullUser.name,
  };
};

/**
 * Creates subscription with payment method.
 * Called after frontend creates payment method via PayMongo.js.
 *
 * @param {Object} user - Authenticated user
 * @param {string} planId - PayMongo Plan ID
 * @param {string} paymentMethodId - Payment method created by frontend
 * @returns {Promise<Object>} Created subscription
 */
export const createSubscriptionWithPayment = async (user, planId, paymentMethodId) => {
  const planName = config.paymongo.planIdToName[planId];
  if (!planName) {
    throw new BadRequestError('Invalid plan ID');
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      paymongoCustomerId: true,
    },
  });

  if (!fullUser?.paymongoCustomerId) {
    throw new BadRequestError('Customer not found. Please try again.');
  }

  // Create subscription with payment method attached
  const subscription = await paymongo.createSubscription({
    customerId: fullUser.paymongoCustomerId,
    planId,
    paymentMethodId,
    metadata: { userId: user.id },
  });

  // Check if 3DS authentication is required
  const paymentIntent = subscription.attributes.latest_invoice?.payment_intent;
  const status = paymentIntent?.attributes?.status;

  if (status === 'awaiting_next_action') {
    // 3DS required - return redirect URL
    const nextAction = paymentIntent.attributes.next_action;
    
    // Store pending subscription
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymongoSubscriptionId: subscription.id,
        paymongoPlanId: planId,
        subscriptionStatus: 'pending',
      },
    });

    return {
      success: true,
      requires3DS: true,
      subscriptionId: subscription.id,
      redirectUrl: nextAction?.redirect?.url,
      status: 'awaiting_next_action',
    };
  }

  // Payment succeeded immediately
  await prisma.user.update({
    where: { id: user.id },
    data: {
      paymongoSubscriptionId: subscription.id,
      paymongoPlanId: planId,
      plan: planName,
      subscriptionStatus: subscription.attributes.status,
      currentPeriodEnd: subscription.attributes.next_billing_schedule 
        ? new Date(subscription.attributes.next_billing_schedule * 1000)
        : null,
    },
  });

  // Update usage limits
  const newLimits = getPlanLimits(planName);
  const now = new Date();
  await prisma.usageMonth.updateMany({
    where: {
      userId: user.id,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    },
    data: { viewsLimit: newLimits.monthlyViews },
  });

  return {
    success: true,
    requires3DS: false,
    subscriptionId: subscription.id,
    status: subscription.attributes.status,
  };
};

/**
 * Completes subscription setup after successful payment.
 * Called from frontend after payment method attachment succeeds.
 *
 * @param {string} userId - User ID
 * @param {string} subscriptionId - PayMongo Subscription ID
 * @returns {Promise<Object>} Updated subscription status
 */
export const completeSubscription = async (userId, subscriptionId) => {
  const subscription = await paymongo.getSubscription(subscriptionId);
  
  if (subscription.attributes.status === 'active') {
    await syncSubscription(subscription);
    return { success: true, status: 'active' };
  }
  
  return { 
    success: false, 
    status: subscription.attributes.status,
    message: 'Subscription is not yet active. Payment may still be processing.',
  };
};

/**
 * Changes user's subscription plan.
 * New plan takes effect on next billing cycle.
 *
 * @param {Object} user - Authenticated user
 * @param {string} newPlanId - New PayMongo Plan ID
 * @returns {Promise<Object>} Updated subscription
 */
export const changePlan = async (user, newPlanId) => {
  const planName = config.paymongo.planIdToName[newPlanId];
  if (!planName) {
    throw new BadRequestError('Invalid plan ID');
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      paymongoSubscriptionId: true,
      subscriptionStatus: true,
    },
  });

  if (!fullUser?.paymongoSubscriptionId || fullUser.subscriptionStatus !== 'active') {
    throw new BadRequestError('No active subscription found');
  }

  const subscription = await paymongo.changeSubscriptionPlan(
    fullUser.paymongoSubscriptionId,
    newPlanId
  );

  return {
    success: true,
    message: 'Plan change scheduled for next billing cycle',
    newPlan: planName,
    effectiveDate: subscription.attributes.next_billing_schedule,
  };
};

/**
 * Cancels user's subscription.
 * Takes effect immediately.
 *
 * @param {Object} user - Authenticated user
 * @returns {Promise<Object>} Cancellation result
 */
export const cancelSubscription = async (user) => {
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      paymongoSubscriptionId: true,
      subscriptionStatus: true,
    },
  });

  if (!fullUser?.paymongoSubscriptionId) {
    throw new BadRequestError('No subscription found');
  }

  await paymongo.cancelSubscription(fullUser.paymongoSubscriptionId);

  // Update local state (webhook will also fire, but update immediately for UX)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: 'FREE',
      subscriptionStatus: 'cancelled',
      paymongoSubscriptionId: null,
      paymongoPlanId: null,
      currentPeriodEnd: null,
      rolloverCredits: 0,
    },
  });

  return { success: true, message: 'Subscription cancelled' };
};

// ===========================================
// Webhook Handlers
// ===========================================

/**
 * Handles subscription.activated event.
 * Activates the subscription and upgrades the user's plan.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
export const handleSubscriptionActivated = async (subscription) => {
  await syncSubscription(subscription);
};

/**
 * Handles subscription.updated event.
 * Syncs plan changes and status transitions.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
export const handleSubscriptionUpdated = async (subscription) => {
  const status = subscription.attributes.status;
  
  if (status === 'cancelled' || status === 'incomplete_cancelled') {
    await handleSubscriptionCancelled(subscription);
  } else {
    await syncSubscription(subscription);
  }
};

/**
 * Handles subscription.past_due event.
 * Marks subscription as past due for follow-up.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
export const handleSubscriptionPastDue = async (subscription) => {
  const user = await findUserByCustomerId(subscription.attributes.customer_id);
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: 'past_due' },
  });

  console.log(`[handleSubscriptionPastDue] User ${user.id} subscription is past due`);
};

/**
 * Handles subscription.unpaid event.
 * Multiple failed payment attempts - may need intervention.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
export const handleSubscriptionUnpaid = async (subscription) => {
  const user = await findUserByCustomerId(subscription.attributes.customer_id);
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: 'unpaid' },
  });

  console.log(`[handleSubscriptionUnpaid] User ${user.id} subscription is unpaid`);
};

/**
 * Handles subscription cancellation (from updated event).
 * Downgrades user to FREE plan and clears billing state.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
const handleSubscriptionCancelled = async (subscription) => {
  const user = await findUserByCustomerId(subscription.attributes.customer_id);
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: 'FREE',
      subscriptionStatus: 'cancelled',
      paymongoSubscriptionId: null,
      paymongoPlanId: null,
      currentPeriodEnd: null,
      rolloverCredits: 0,
    },
  });

  // Update current month's usage limit back to FREE plan limit
  const freeLimits = getPlanLimits('FREE');
  const now = new Date();
  
  await prisma.usageMonth.updateMany({
    where: {
      userId: user.id,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    },
    data: { viewsLimit: freeLimits.monthlyViews },
  });

  console.log(`[handleSubscriptionCancelled] User ${user.id} downgraded to FREE`);
};

/**
 * Handles subscription.invoice.paid event.
 * Processes credit rollover on successful renewal payment.
 *
 * @param {Object} invoice - PayMongo Invoice object
 */
export const handleInvoicePaid = async (invoice) => {
  const subscriptionId = invoice.attributes.subscription_id;
  if (!subscriptionId) return;

  // Get user by subscription ID
  const user = await prisma.user.findFirst({
    where: { paymongoSubscriptionId: subscriptionId },
  });
  
  if (!user) {
    console.error(`[handleInvoicePaid] No user found for subscription ${subscriptionId}`);
    return;
  }

  // Check if this is a renewal (not first payment)
  const isRenewal = user.currentPeriodEnd && 
    new Date(user.currentPeriodEnd) < new Date();

  if (isRenewal) {
    await processCreditRollover(user);
  }

  // Update period end from subscription
  const subscription = await paymongo.getSubscription(subscriptionId);
  const nextBilling = subscription.attributes.next_billing_schedule;
  
  if (nextBilling) {
    await prisma.user.update({
      where: { id: user.id },
      data: { currentPeriodEnd: new Date(nextBilling * 1000) },
    });
  }

  console.log(`[handleInvoicePaid] Processed invoice for user ${user.id}`);
};

/**
 * Handles subscription.invoice.payment_failed event.
 * Logs failure for monitoring.
 *
 * @param {Object} invoice - PayMongo Invoice object
 */
export const handleInvoicePaymentFailed = async (invoice) => {
  const subscriptionId = invoice.attributes.subscription_id;
  if (!subscriptionId) return;

  const user = await prisma.user.findFirst({
    where: { paymongoSubscriptionId: subscriptionId },
  });

  if (user) {
    console.error(`[handleInvoicePaymentFailed] Payment failed for user ${user.id}`);
  }
};

// ===========================================
// Credit Rollover
// ===========================================

/**
 * Processes credit rollover at billing cycle renewal.
 *
 * Logic:
 * 1. Find the user's most recent UsageMonth record
 * 2. Calculate unused views (limit - used)
 * 3. Cap at plan's rolloverCap
 * 4. Store on user.rolloverCredits for next month
 *
 * @param {Object} user - User record with current plan
 */
export const processCreditRollover = async (user) => {
  const limits = getPlanLimits(user.plan);

  if (!limits.rolloverEnabled) return;

  await prisma.$transaction(async (tx) => {
    const latestUsage = await tx.usageMonth.findFirst({
      where: { userId: user.id },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    if (!latestUsage) return;

    const unused = Math.max(0, latestUsage.viewsLimit - latestUsage.viewsUsed);
    const totalRollover = Math.min(
      unused + user.rolloverCredits,
      limits.rolloverCap,
    );

    await tx.user.update({
      where: { id: user.id },
      data: { rolloverCredits: totalRollover },
    });
  });
};

// ===========================================
// Helpers
// ===========================================

/**
 * Syncs a PayMongo subscription object to local DB state.
 *
 * @param {Object} subscription - PayMongo Subscription object
 */
const syncSubscription = async (subscription) => {
  const attrs = subscription.attributes;
  
  console.log(`[syncSubscription] Processing subscription ${subscription.id}`);
  console.log(`[syncSubscription] Customer: ${attrs.customer_id}, Status: ${attrs.status}`);

  // Find user by customer ID or subscription metadata
  let user = await findUserByCustomerId(attrs.customer_id);
  
  if (!user) {
    // Try by subscription ID (for pending subscriptions)
    user = await prisma.user.findFirst({
      where: { paymongoSubscriptionId: subscription.id },
    });
  }

  if (!user) {
    console.error(`[syncSubscription] User not found for subscription ${subscription.id}`);
    return;
  }

  const planId = attrs.plan_id;
  const planName = config.paymongo.planIdToName[planId];

  console.log(`[syncSubscription] PlanId: ${planId}, Mapped plan: ${planName || 'UNKNOWN'}`);

  const updateData = {
    paymongoSubscriptionId: subscription.id,
    paymongoPlanId: planId,
    subscriptionStatus: attrs.status,
  };

  // Update period end from next billing schedule
  if (attrs.next_billing_schedule) {
    updateData.currentPeriodEnd = new Date(attrs.next_billing_schedule * 1000);
  }

  // Update plan if subscription is active and we have valid mapping
  if (planName && attrs.status === 'active') {
    updateData.plan = planName;
    console.log(`[syncSubscription] Upgrading user ${user.id} to plan ${planName}`);

    // Update current month's usage limit
    const newLimits = getPlanLimits(planName);
    const now = new Date();

    await prisma.usageMonth.updateMany({
      where: {
        userId: user.id,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      },
      data: { viewsLimit: newLimits.monthlyViews },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  console.log(`[syncSubscription] ✅ Synced user ${user.id}:`, JSON.stringify(updateData));
};

/**
 * Finds a user by their PayMongo customer ID.
 *
 * @param {string} customerId - PayMongo Customer ID
 * @returns {Promise<Object|null>} User or null
 */
const findUserByCustomerId = async (customerId) => {
  return prisma.user.findUnique({
    where: { paymongoCustomerId: customerId },
  });
};

/**
 * Gets the billing status for a user (for API response).
 *
 * @param {string} userId - User ID
 * @returns {Object} Billing summary
 */
export const getBillingStatus = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      paymongoCustomerId: true,
      paymongoSubscriptionId: true,
      paymongoPlanId: true,
      subscriptionStatus: true,
      currentPeriodEnd: true,
      rolloverCredits: true,
    },
  });

  if (!user) throw new NotFoundError('User not found');

  const currentPlanLimits = getPlanLimits(user.plan);

  const now = new Date();
  const currentUsage = await prisma.usageMonth.findFirst({
    where: {
      userId: userId,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    },
    select: {
      viewsUsed: true,
      viewsLimit: true,
    },
  });

  return {
    plan: user.plan,
    subscriptionStatus: user.subscriptionStatus,
    currentPeriodEnd: user.currentPeriodEnd,
    rolloverCredits: user.rolloverCredits,
    hasActiveSubscription:
      user.subscriptionStatus === 'active' && !!user.paymongoSubscriptionId,
    currentPlanLimits: {
      maxActiveCountdowns: currentPlanLimits.maxActiveCountdowns,
      monthlyViews: currentPlanLimits.monthlyViews,
      countdownDurationDays: currentPlanLimits.countdownDurationDays,
      customization: currentPlanLimits.customization,
      removeBranding: currentPlanLimits.removeBranding,
      apiAccess: currentPlanLimits.apiAccess,
      analytics: currentPlanLimits.analytics,
      rolloverEnabled: currentPlanLimits.rolloverEnabled,
      rolloverCap: currentPlanLimits.rolloverCap,
    },
    currentUsage: currentUsage
      ? {
          viewsUsed: currentUsage.viewsUsed,
          viewsLimit: currentUsage.viewsLimit,
          viewsRemaining: currentUsage.viewsLimit - currentUsage.viewsUsed,
        }
      : null,
    availablePlans: Object.entries(config.paymongo.nameToPlanId)
      .filter(([, planId]) => planId)
      .map(([plan, planId]) => ({
        plan,
        planId,
        limits: getPlanLimits(plan),
        isCurrent: plan === user.plan,
      })),
  };
};

export default {
  prepareSubscription,
  createSubscriptionWithPayment,
  completeSubscription,
  changePlan,
  cancelSubscription,
  handleSubscriptionActivated,
  handleSubscriptionUpdated,
  handleSubscriptionPastDue,
  handleSubscriptionUnpaid,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  processCreditRollover,
  getBillingStatus,
};
