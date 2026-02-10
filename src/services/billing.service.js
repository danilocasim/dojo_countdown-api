// ===========================================
// Billing Service
// ===========================================
// Handles Stripe subscription lifecycle, plan transitions,
// and credit rollover logic.
//
// WHY THIS DESIGN:
// - Backend is source of truth for plan state
// - Plan changes only via verified Stripe webhooks
// - Credit rollover in single DB transactions
// - Idempotent webhook handling (safe for retries)

import Stripe from 'stripe';
import prisma from '../lib/prisma.js';
import config from '../config/index.js';
import { getPlanLimits } from '../config/plans.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

const stripe = new Stripe(config.stripe.secretKey);

// ===========================================
// Checkout & Portal
// ===========================================

/**
 * Creates a Stripe Checkout Session for subscription upgrade.
 *
 * WHY CHECKOUT (not custom UI):
 * - PCI compliance handled by Stripe
 * - Faster MVP with less surface area
 * - Supports SCA/3DS out of the box
 *
 * NOTE: For users with existing subscriptions, they should use
 * the billing portal instead. This function is for new subscriptions only.
 *
 * @param {Object} user - Authenticated user from req.user
 * @param {string} priceId - Stripe Price ID for the target plan
 * @returns {Promise<string>} Checkout session URL
 */
export const createCheckoutSession = async (user, priceId) => {
  const plan = config.stripe.priceToplan[priceId];
  if (!plan) {
    throw new BadRequestError('Invalid price ID');
  }

  // Check if user already has an active subscription
  // They should use billing portal for plan changes instead
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      stripeSubscriptionId: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
    },
  });

  if (
    fullUser?.stripeSubscriptionId &&
    fullUser?.subscriptionStatus === 'active'
  ) {
    throw new BadRequestError(
      'You already have an active subscription. Please use the billing portal to change your plan.',
    );
  }

  // Reuse existing Stripe customer or create one
  let customerId = user.stripeCustomerId || fullUser?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${config.frontendUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.frontendUrl}/billing/cancel`,
    metadata: { userId: user.id },
    subscription_data: {
      metadata: { userId: user.id },
    },
  });

  return session.url;
};

/**
 * Creates a Stripe Customer Portal session for self-service
 * subscription management (cancel, update payment, view invoices).
 *
 * @param {Object} user - Authenticated user from req.user
 * @returns {Promise<string>} Portal session URL
 */
export const createPortalSession = async (user) => {
  if (!user.stripeCustomerId) {
    throw new BadRequestError('No active subscription found');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${config.frontendUrl}/billing`,
  });

  return session.url;
};

// ===========================================
// Webhook Handlers
// ===========================================

/**
 * Handles checkout.session.completed event.
 * Links the Stripe customer to the user if not already linked.
 *
 * WHY NOT UPDATE PLAN HERE:
 * - subscription.created fires separately with full sub data
 * - Keeps each handler focused on one concern
 *
 * @param {Object} session - Stripe Checkout Session object
 */
export const handleCheckoutCompleted = async (session) => {
  const userId = session.metadata?.userId;
  if (!userId) return;

  const customerId = session.customer;

  // Idempotent: only update if not already set
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  if (!user.stripeCustomerId) {
    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customerId },
    });
  }
};

/**
 * Handles customer.subscription.created event.
 * Activates the subscription and upgrades the user's plan.
 *
 * @param {Object} subscription - Stripe Subscription object
 */
export const handleSubscriptionCreated = async (subscription) => {
  await syncSubscription(subscription);
};

/**
 * Handles customer.subscription.updated event.
 * Syncs plan changes, renewals, and status transitions.
 *
 * Credit rollover triggers on billing cycle renewal:
 * when currentPeriodEnd advances to a new value.
 *
 * @param {Object} subscription - Stripe Subscription object
 */
export const handleSubscriptionUpdated = async (subscription) => {
  const user = await findUserByCustomerId(subscription.customer);
  if (!user) return;

  // Detect billing cycle renewal: currentPeriodEnd changed
  const newPeriodEnd = new Date(subscription.current_period_end * 1000);
  const isRenewal =
    user.currentPeriodEnd &&
    newPeriodEnd.getTime() !== user.currentPeriodEnd.getTime();

  if (isRenewal && subscription.status === 'active') {
    await processCreditRollover(user);
  }

  await syncSubscription(subscription);
};

/**
 * Handles customer.subscription.deleted event.
 * Downgrades user to FREE plan and clears billing state.
 *
 * @param {Object} subscription - Stripe Subscription object
 */
export const handleSubscriptionDeleted = async (subscription) => {
  const user = await findUserByCustomerId(subscription.customer);
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: 'FREE',
      subscriptionStatus: 'canceled',
      stripeSubscriptionId: null,
      stripePriceId: null,
      currentPeriodEnd: null,
      rolloverCredits: 0, // Free plan gets no rollover
    },
  });

  // Update current month's usage limit back to FREE plan limit
  const freeLimits = getPlanLimits('FREE');
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  try {
    await prisma.usageMonth.updateMany({
      where: {
        userId: user.id,
        year: currentYear,
        month: currentMonth,
      },
      data: {
        viewsLimit: freeLimits.monthlyViews,
      },
    });
    console.log(
      `[handleSubscriptionDeleted] Reset usage limit to ${freeLimits.monthlyViews} for FREE plan`,
    );
  } catch (err) {
    console.error(
      `[handleSubscriptionDeleted] Failed to update usage limit:`,
      err.message,
    );
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
 * WHY SINGLE TRANSACTION:
 * - Prevents partial state if DB fails mid-update
 * - rolloverCredits is consumed when next UsageMonth is created
 *
 * @param {Object} user - User record with current plan
 */
export const processCreditRollover = async (user) => {
  const limits = getPlanLimits(user.plan);

  // Free plan never rolls over
  if (!limits.rolloverEnabled) return;

  await prisma.$transaction(async (tx) => {
    // Find the most recent usage month
    const latestUsage = await tx.usageMonth.findFirst({
      where: { userId: user.id },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    if (!latestUsage) {
      // No usage history yet — nothing to roll over
      return;
    }

    const unused = Math.max(0, latestUsage.viewsLimit - latestUsage.viewsUsed);
    // Combine with any existing rollover, then cap
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
 * Syncs a Stripe subscription object to local DB state.
 * Shared by created and updated handlers for DRY-ness.
 *
 * WHY MULTIPLE LOOKUP STRATEGIES:
 * - stripeCustomerId: Primary lookup when user already linked
 * - subscription metadata: Fallback for race conditions where
 *   subscription.created arrives before checkout.completed
 * - Handles edge cases where webhooks arrive out of order
 *
 * @param {Object} subscription - Stripe Subscription object
 */
const syncSubscription = async (subscription) => {
  console.log(`[syncSubscription] Processing subscription ${subscription.id}`);
  console.log(
    `[syncSubscription] Customer: ${subscription.customer}, Status: ${subscription.status}`,
  );
  console.log(
    `[syncSubscription] Metadata userId: ${subscription.metadata?.userId || 'none'}`,
  );

  // Strategy 1: Find user by stripeCustomerId
  let user = await findUserByCustomerId(subscription.customer);
  console.log(
    `[syncSubscription] Lookup by customerId: ${user ? `found user ${user.id}` : 'not found'}`,
  );

  // Strategy 2: Fallback to userId in subscription metadata
  if (!user && subscription.metadata?.userId) {
    console.log(`[syncSubscription] Trying metadata userId lookup...`);
    user = await prisma.user.findUnique({
      where: { id: subscription.metadata.userId },
    });
    console.log(
      `[syncSubscription] Lookup by metadata: ${user ? `found user ${user.id}` : 'not found'}`,
    );

    // Link the customer ID since we found the user via metadata
    if (user) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: subscription.customer },
        });
        console.log(
          `[syncSubscription] Linked stripeCustomerId ${subscription.customer} to user ${user.id}`,
        );
      } catch (linkErr) {
        console.error(
          `[syncSubscription] Failed to link customerId:`,
          linkErr.message,
        );
      }
    }
  }

  if (!user) {
    console.error(
      `[syncSubscription] User not found for subscription ${subscription.id}, customer ${subscription.customer}`,
    );
    return;
  }

  const priceId = subscription.items.data[0]?.price?.id;
  const plan = config.stripe.priceToplan[priceId];

  console.log(
    `[syncSubscription] PriceId: ${priceId}, Mapped plan: ${plan || 'UNKNOWN'}`,
  );

  if (!plan) {
    console.error(
      `[syncSubscription] Invalid priceId ${priceId} - no matching plan found in config`,
    );
    console.error(
      `[syncSubscription] Available mappings:`,
      JSON.stringify(config.stripe.priceToplan),
    );
    // Continue anyway to update subscription status, just don't update plan
  }

  const updateData = {
    stripeSubscriptionId: subscription.id,
    stripePriceId: priceId,
    subscriptionStatus: subscription.status,
  };

  // Handle currentPeriodEnd - it may be at subscription level or item level
  const periodEnd = subscription.current_period_end 
    || subscription.items?.data[0]?.current_period_end;
  
  if (periodEnd) {
    updateData.currentPeriodEnd = new Date(periodEnd * 1000);
  }

  // Update plan if we have a valid plan mapping and subscription is active
  if (plan && subscription.status === 'active') {
    updateData.plan = plan;
    console.log(
      `[syncSubscription] Will update user ${user.id} to plan ${plan}`,
    );

    // Update current month's usage limit to match new plan
    const newLimits = getPlanLimits(plan);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    try {
      const usageResult = await prisma.usageMonth.updateMany({
        where: {
          userId: user.id,
          year: currentYear,
          month: currentMonth,
        },
        data: {
          viewsLimit: newLimits.monthlyViews,
        },
      });
      console.log(
        `[syncSubscription] Updated ${usageResult.count} usage records, limit: ${newLimits.monthlyViews}`,
      );
    } catch (err) {
      console.error(
        `[syncSubscription] Failed to update usage limit:`,
        err.message,
      );
    }
  } else {
    console.log(
      `[syncSubscription] Skipping plan update: plan=${plan}, status=${subscription.status}`,
    );
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
    console.log(
      `[syncSubscription] ✅ Successfully synced user ${user.id}:`,
      JSON.stringify(updateData),
    );
  } catch (updateErr) {
    console.error(
      `[syncSubscription] ❌ Failed to update user:`,
      updateErr.message,
    );
    console.error(
      `[syncSubscription] Update data was:`,
      JSON.stringify(updateData),
    );
    throw updateErr; // Re-throw so webhook handler knows it failed
  }
};

/**
 * Finds a user by their Stripe customer ID.
 *
 * @param {string} customerId - Stripe Customer ID
 * @returns {Promise<Object|null>} User or null
 */
const findUserByCustomerId = async (customerId) => {
  return prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });
};

/**
 * Gets the billing status for a user (for API response).
 *
 * @param {Object} user - User with billing fields
 * @returns {Object} Billing summary
 */
export const getBillingStatus = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      subscriptionStatus: true,
      currentPeriodEnd: true,
      rolloverCredits: true,
    },
  });

  if (!user) throw new NotFoundError('User not found');

  // Get current plan limits
  const currentPlanLimits = getPlanLimits(user.plan);

  // Get current month's usage
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
      user.subscriptionStatus === 'active' && !!user.stripeSubscriptionId,
    // Include current plan limits
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
    // Include current usage stats
    currentUsage: currentUsage
      ? {
          viewsUsed: currentUsage.viewsUsed,
          viewsLimit: currentUsage.viewsLimit,
          viewsRemaining: currentUsage.viewsLimit - currentUsage.viewsUsed,
        }
      : null,
    availablePlans: Object.entries(config.stripe.planToPrice)
      .filter(([, priceId]) => priceId) // Only include configured prices
      .map(([plan, priceId]) => ({
        plan,
        priceId,
        limits: getPlanLimits(plan),
        isCurrent: plan === user.plan,
      })),
  };
};

export default {
  createCheckoutSession,
  createPortalSession,
  handleCheckoutCompleted,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  processCreditRollover,
  getBillingStatus,
};
