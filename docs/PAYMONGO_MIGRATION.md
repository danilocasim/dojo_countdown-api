# Stripe to PayMongo Migration Guide

## Overview

This document describes the migration from Stripe to PayMongo for payment processing in DojoCountdown.

## Key Differences

| Feature | Stripe | PayMongo |
|---------|--------|----------|
| Checkout | Hosted checkout page | In-app payment modal |
| Customer Portal | Built-in portal for subscription management | Custom UI (cancel/change buttons) |
| Subscription Creation | Create checkout session → redirect | Create subscription → attach payment method |
| Webhook Events | `customer.subscription.*` | `subscription.*`, `subscription.invoice.*` |
| Price IDs | Price objects | Plan objects |
| API Style | Stripe SDK | REST API with Basic Auth |

## Migration Steps

### 1. Backend Changes

#### Files Modified:
- `package.json` - Replace `stripe` with `paymongo` dependency
- `src/config/index.js` - Update configuration for PayMongo keys
- `src/routes/billing.routes.js` - Update route handlers
- `prisma/schema.prisma` - Rename Stripe fields to PayMongo

#### Files Created:
- `src/lib/paymongo.js` - PayMongo API client
- `src/services/billing.paymongo.service.js` - Billing service
- `src/controllers/billing.paymongo.controller.js` - Controller

### 2. Frontend Changes

#### Files Modified:
- `src/api/billing.js` - Update API endpoints
- `src/hooks/useBilling.js` - Update hook methods
- `src/pages/Billing.jsx` - Update UI for PayMongo flow

#### Files Created:
- `src/components/billing/PaymentModal.jsx` - Payment collection modal

### 3. Database Migration

Run the Prisma migration:

```bash
npx prisma migrate dev --name migrate_stripe_to_paymongo
```

This renames:
- `stripeCustomerId` → `paymongoCustomerId`
- `stripeSubscriptionId` → `paymongoSubscriptionId`
- `stripePriceId` → `paymongoPlanId`

### 4. Environment Variables

Update your `.env` file:

```bash
# Remove Stripe variables
# STRIPE_SECRET_KEY=...
# STRIPE_WEBHOOK_SECRET=...
# STRIPE_PRICE_BOOTSTRAP=...
# STRIPE_PRICE_STARTUP=...
# STRIPE_PRICE_ENTERPRISE=...

# Add PayMongo variables
PAYMONGO_SECRET_KEY="sk_test_..."
PAYMONGO_PUBLIC_KEY="pk_test_..."
PAYMONGO_WEBHOOK_SECRET="whsec_..."
PAYMONGO_PLAN_BOOTSTRAP="plan_..."
PAYMONGO_PLAN_STARTUP="plan_..."
PAYMONGO_PLAN_ENTERPRISE="plan_..."
```

### 5. Create PayMongo Plans

Before going live, create plans in PayMongo:

```bash
# Example: Create Bootstrap plan (PHP 500/month)
curl -X POST https://api.paymongo.com/v1/plans \
  -u sk_test_YOUR_SECRET_KEY: \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "attributes": {
        "name": "Bootstrap",
        "description": "For small projects and testing",
        "amount": 50000,
        "currency": "PHP",
        "interval": "monthly",
        "interval_count": 1
      }
    }
  }'
```

Save the returned `plan_...` IDs to your environment.

### 6. Register Webhook

Register your webhook endpoint with PayMongo:

```bash
curl -X POST https://api.paymongo.com/v1/webhooks \
  -u sk_test_YOUR_SECRET_KEY: \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "attributes": {
        "url": "https://your-domain.com/api/v1/billing/webhook",
        "events": [
          "subscription.activated",
          "subscription.updated",
          "subscription.past_due",
          "subscription.unpaid",
          "subscription.invoice.paid",
          "subscription.invoice.payment_failed"
        ]
      }
    }
  }'
```

Save the webhook secret for signature verification.

## API Changes

### Endpoints Changed

| Old Endpoint | New Endpoint | Notes |
|--------------|--------------|-------|
| POST /billing/checkout | POST /billing/subscribe | Returns payment intent instead of URL |
| GET /billing/portal | POST /billing/cancel | No portal, direct cancel |
| - | POST /billing/complete | Complete subscription after payment |
| - | POST /billing/change-plan | Change subscription plan |
| - | GET /billing/subscription | Get subscription details |

### Webhook Events

| Stripe Event | PayMongo Event |
|--------------|----------------|
| checkout.session.completed | (handled in subscription flow) |
| customer.subscription.created | subscription.activated |
| customer.subscription.updated | subscription.updated |
| customer.subscription.deleted | subscription.updated (status: cancelled) |
| invoice.paid | subscription.invoice.paid |
| invoice.payment_failed | subscription.invoice.payment_failed |

## Testing

### Test Cards

PayMongo test cards:
- **Success**: `4343 4343 4343 4345`
- **3DS Required**: `4120 0000 0000 0007`
- **Decline**: `4444 4444 4444 4440`

Use any future expiry date and any 3-digit CVC.

### Test Webhook Locally

Use ngrok to expose local server:

```bash
ngrok http 3000
```

Then register the ngrok URL as your webhook endpoint.

## Rollback Plan

If issues arise, you can revert by:

1. Restore old files from git:
   ```bash
   git checkout HEAD~1 -- src/services/billing.service.js
   git checkout HEAD~1 -- src/controllers/billing.controller.js
   git checkout HEAD~1 -- src/routes/billing.routes.js
   ```

2. Revert database (create reverse migration):
   ```sql
   ALTER TABLE users RENAME COLUMN "paymongoCustomerId" TO "stripeCustomerId";
   ALTER TABLE users RENAME COLUMN "paymongoSubscriptionId" TO "stripeSubscriptionId";
   ALTER TABLE users RENAME COLUMN "paymongoPlanId" TO "stripePriceId";
   ```

3. Restore environment variables

## Important Notes

1. **No Prorating**: PayMongo doesn't support prorated billing. Full amount charged on plan changes.

2. **Account Configuration**: Contact PayMongo support to enable subscription features for your account.

3. **Payment Methods**: Currently supports Card and Maya for subscriptions.

4. **24-Hour Payment Window**: First invoice must be paid within 24 hours or subscription is cancelled.

5. **Invoice Lifecycle**: Invoices auto-generate 1 day before billing, finalize 12 hours later.

## Support

- PayMongo Docs: https://developers.paymongo.com/docs
- API Reference: https://developers.paymongo.com/reference
- Support: support@paymongo.com
