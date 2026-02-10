# Stripe Webhook Setup Guide

This guide explains how to configure Stripe webhooks for the DojoCountdown API to properly receive payment events and update user plans.

## 🎯 Overview

Stripe webhooks notify your server when subscription events occur (e.g., payment completed, subscription updated/cancelled). Without webhooks configured, user plans won't update after payment.

## 🔧 Local Development Setup

For local testing, use the Stripe CLI to forward webhooks from Stripe to your local server:

### 1. Install Stripe CLI

If not already installed:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

### 2. Login to Stripe

```bash
stripe login
```

This opens your browser to authenticate with your Stripe account.

### 3. Forward Webhooks to Local Server

Start the webhook forwarding (keep this running in a terminal):

```bash
stripe listen --forward-to localhost:3002/api/v1/billing/webhook
```

**Important:** The command will print a webhook signing secret like `whsec_xxxxx`. This is already configured in your `.env` file, but if you see a different secret, update `.env`:

```bash
STRIPE_WEBHOOK_SECRET="whsec_your_new_secret_here"
```

### 4. Test the Webhook

In another terminal, trigger a test event:

```bash
stripe trigger customer.subscription.created
```

You should see:
- Webhook event in the Stripe CLI output
- Log messages in your API server showing webhook processing
- User plan updated in database

## 🚀 Production Setup

For production, you need to register your webhook endpoint in the Stripe Dashboard.

### Option A: Via Stripe CLI (Recommended)

```bash
stripe webhook_endpoints create \
  --url "https://api.yourdomain.com/api/v1/billing/webhook" \
  --enabled-event checkout.session.completed \
  --enabled-event customer.subscription.created \
  --enabled-event customer.subscription.updated \
  --enabled-event customer.subscription.deleted \
  --description "DojoCountdown Production Webhooks"
```

This will return a webhook endpoint ID and a **signing secret**. Copy the signing secret and add it to your production environment variables:

```bash
STRIPE_WEBHOOK_SECRET="whsec_production_secret_here"
```

### Option B: Via Stripe Dashboard (Manual)

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter your endpoint URL: `https://api.yourdomain.com/api/v1/billing/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** from the endpoint details page
7. Add it to your production environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_production_secret_here"
   ```

### Webhook Endpoint Details

- **Endpoint URL:** `https://api.yourdomain.com/api/v1/billing/webhook`
- **Events to subscribe to:**
  - `checkout.session.completed` - Links customer to user after successful checkout
  - `customer.subscription.created` - Activates subscription and upgrades plan
  - `customer.subscription.updated` - Handles plan changes and renewals
  - `customer.subscription.deleted` - Downgrades user to FREE plan
- **API Version:** Use the latest version (currently 2025-12-15)

## 🧪 Testing Webhooks

### Test in Local Development

1. Start webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3002/api/v1/billing/webhook
   ```

2. In another terminal, create a test checkout:
   ```bash
   curl -X POST http://localhost:3002/api/v1/billing/checkout \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"priceId": "price_1SypoeK4C8jOyCJwWKaXiUW4"}'
   ```

3. Complete the checkout with test card: `4242 4242 4242 4242`

4. Check the webhook was received:
   ```bash
   # Check Stripe CLI output
   # Check API server logs
   # Verify plan updated in database
   ```

### Test Events

Trigger specific events directly:

```bash
# Test subscription created
stripe trigger customer.subscription.created

# Test subscription updated
stripe trigger customer.subscription.updated

# Test subscription deleted
stripe trigger customer.subscription.deleted

# Test checkout completed
stripe trigger checkout.session.completed
```

## 🔍 Troubleshooting

### Webhooks Not Being Received

1. **Check webhook endpoint is registered:**
   ```bash
   stripe webhook_endpoints list
   ```

2. **Verify webhook secret in .env matches Stripe:**
   - Local: Check Stripe CLI output
   - Production: Check Stripe Dashboard → Webhooks → Your endpoint → Signing secret

3. **Check firewall/network:**
   - Production: Ensure your server is publicly accessible
   - Check that port 3002 (or your configured port) is open

4. **Check Stripe Dashboard:**
   - Go to Developers → Webhooks → Your endpoint
   - Click on recent attempts to see if they're succeeding or failing
   - Check response codes and error messages

### Plan Not Updating After Payment

1. **Check webhook logs:**
   ```bash
   # In Stripe Dashboard: Developers → Webhooks → Your endpoint → Recent deliveries
   ```

2. **Check API server logs:**
   Look for these log messages:
   ```
   [Webhook] Received event: customer.subscription.created
   [syncSubscription] Processing subscription sub_xxx, status: active
   [syncSubscription] Updating user xxx to plan BOOTSTRAP
   ```

3. **Verify subscription status:**
   - Subscription must have `status: 'active'` to update plan
   - Check Stripe Dashboard → Customers → Subscriptions

4. **Verify price ID mapping:**
   - Ensure `.env` price IDs match Stripe Dashboard prices
   - Check `[syncSubscription]` logs for "Invalid priceId" errors

### Webhook Signature Verification Failed

This means the webhook secret in `.env` doesn't match the one from Stripe.

**Solution:**
1. Get the correct secret:
   - Local: Check Stripe CLI output when running `stripe listen`
   - Production: Check Stripe Dashboard → Webhooks → Your endpoint → Signing secret
2. Update `.env`:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_correct_secret_here"
   ```
3. Restart your server

## 📊 Monitoring

### Check Webhook Health

**Stripe Dashboard:**
1. Go to Developers → Webhooks
2. Click on your endpoint
3. View success/failure rates and recent deliveries

**API Logs:**
Monitor your server logs for webhook-related messages:
```bash
# Look for webhook processing logs
grep -i webhook /var/log/your-api.log

# Or if using PM2:
pm2 logs | grep -i webhook
```

### Success Indicators

You know webhooks are working when:
- ✅ Stripe Dashboard shows 200 responses for webhook deliveries
- ✅ API logs show `[Webhook] Successfully processed` messages
- ✅ User's `plan` field updates in database after payment
- ✅ User's `subscriptionStatus` shows 'active'
- ✅ User's `currentPeriodEnd` is set to future date

## 🔐 Security Notes

- **Never commit webhook secrets to git**
- **Use different webhook secrets for test and production**
- **Always verify webhook signatures** (already implemented in the code)
- **Return 200 even for handled errors** to prevent Stripe retries (already implemented)

## 📚 Additional Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Testing Webhooks](https://stripe.com/docs/webhooks/test)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
