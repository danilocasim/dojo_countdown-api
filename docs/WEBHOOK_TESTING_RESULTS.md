# ✅ Stripe Webhook Testing & Verification

## 🎉 Current Status

**✅ Local webhook forwarding is ACTIVE**

Stripe CLI is forwarding webhooks to: `localhost:3002/api/v1/billing/webhook`

### Recent Webhook Activity

```
✅ customer.subscription.created - Received & processed (200 OK)
✅ checkout.session.completed - Ready to receive
✅ customer.subscription.updated - Ready to receive
✅ customer.subscription.deleted - Ready to receive
```

## 🧪 How to Test the Full Payment Flow

### Step 1: Make sure Stripe CLI is running

Check if forwarding is active:
```bash
ps aux | grep "stripe listen"
tail -f /tmp/stripe_listen.log
```

If not running, start it:
```bash
stripe listen --forward-to localhost:3002/api/v1/billing/webhook
```

### Step 2: Create a checkout session

You can do this via:

**Option A: Using the frontend**
1. Login to your app
2. Go to the billing/upgrade page
3. Click on a plan to upgrade

**Option B: Using curl**
```bash
# First, login to get a token
TOKEN=$(curl -s http://localhost:3002/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}' \
  | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

# Create checkout session for BOOTSTRAP plan
curl -X POST http://localhost:3002/api/v1/billing/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"priceId": "price_1SypoeK4C8jOyCJwWKaXiUW4"}'
```

**Option C: Trigger test event directly**
```bash
stripe trigger customer.subscription.created
```

### Step 3: Complete the payment (Option A or B)

1. Open the checkout URL in your browser
2. Use Stripe test card: **4242 4242 4242 4242**
3. Any future expiry date (e.g., 12/34)
4. Any 3-digit CVC (e.g., 123)
5. Any ZIP code (e.g., 12345)

### Step 4: Verify the webhook was received

**Check Stripe CLI logs:**
```bash
tail -20 /tmp/stripe_listen.log
```

You should see:
```
--> checkout.session.completed [evt_xxx]
<-- [200] POST http://localhost:3002/api/v1/billing/webhook
--> customer.subscription.created [evt_xxx]
<-- [200] POST http://localhost:3002/api/v1/billing/webhook
```

**Check API server logs:**

Look for these messages in your server console:
```
[Webhook] Received event: checkout.session.completed
[Webhook] Processing checkout.session.completed
[Webhook] Successfully processed checkout.session.completed

[Webhook] Received event: customer.subscription.created
[Webhook] Processing customer.subscription.created
[syncSubscription] Processing subscription sub_xxx, status: active
[syncSubscription] Updating user xxx to plan BOOTSTRAP
[syncSubscription] Successfully synced subscription
[Webhook] Successfully processed customer.subscription.created
```

### Step 5: Verify the plan updated in database

```bash
cd /home/danilo/repos/dojo-countdown/dojo-countdown-api

node -e "
import prisma from './src/lib/prisma.js';

async function checkUser() {
  const user = await prisma.user.findUnique({
    where: { email: 'YOUR_EMAIL' },
    select: { 
      email: true, 
      plan: true,
      subscriptionStatus: true,
      stripeSubscriptionId: true,
      currentPeriodEnd: true
    }
  });
  
  console.log('User:', JSON.stringify(user, null, 2));
  await prisma.\$disconnect();
}

checkUser();
"
```

You should see:
```json
{
  "email": "your@email.com",
  "plan": "BOOTSTRAP",
  "subscriptionStatus": "active",
  "stripeSubscriptionId": "sub_xxx",
  "currentPeriodEnd": "2026-03-09T..."
}
```

## 🔍 Troubleshooting

### Webhook not received

**Check 1:** Is Stripe CLI running?
```bash
ps aux | grep "stripe listen"
```

If not, start it:
```bash
stripe listen --forward-to localhost:3002/api/v1/billing/webhook
```

**Check 2:** Is API server running?
```bash
curl http://localhost:3002
```

**Check 3:** Check Stripe CLI logs for errors:
```bash
tail -50 /tmp/stripe_listen.log
```

### Plan not updating

**Check 1:** Verify subscription status is 'active'
- Incomplete subscriptions won't update the plan
- Check Stripe Dashboard → Customers → Subscriptions

**Check 2:** Verify price ID mapping
```bash
# Check your .env file
grep STRIPE_PRICE /home/danilo/repos/dojo-countdown/dojo-countdown-api/.env
```

Should show:
```
STRIPE_PRICE_BOOTSTRAP="price_1SypoeK4C8jOyCJwWKaXiUW4"
STRIPE_PRICE_STARTUP="price_1SyppMK4C8jOyCJwjWqGXwKQ"
STRIPE_PRICE_ENTERPRISE="price_1SyppuK4C8jOyCJwnfTVhgyB"
```

**Check 3:** Look for error logs in server
- `[syncSubscription] Invalid priceId` - Price not in mapping
- `[syncSubscription] User not found` - Customer ID mismatch
- `[syncSubscription] Not updating plan: plan=undefined` - Price mapping failed

### Webhook signature verification failed

**Check 1:** Verify webhook secret matches
```bash
# Check what Stripe CLI is using
cat /tmp/stripe_listen.log | grep "signing secret"

# Compare with .env
grep STRIPE_WEBHOOK_SECRET /home/danilo/repos/dojo-countdown/dojo-countdown-api/.env
```

**Check 2:** If they don't match, update .env with the secret from Stripe CLI output

**Check 3:** Restart your API server after updating .env

## 📊 Test Results

### Test: Subscription Created (Simulated)
✅ **PASSED** - User plan updated from FREE to BOOTSTRAP
✅ **PASSED** - Subscription status set to 'active'
✅ **PASSED** - Current period end set correctly
✅ **PASSED** - Stripe subscription ID stored

### Test: Webhook Forwarding
✅ **ACTIVE** - Stripe CLI forwarding webhooks to localhost:3002
✅ **PASSED** - Recent events received and returned 200 OK

### Test: Webhook Signature Verification
✅ **PASSED** - Webhook secret matches .env configuration

## 📝 Next Steps for Production

1. **Deploy your API to production**

2. **Run the production webhook setup script:**
   ```bash
   ./scripts/setup-production-webhook.sh
   ```

3. **Copy the signing secret** to your production environment variables

4. **Test the production webhook:**
   ```bash
   stripe trigger customer.subscription.created
   ```

5. **Monitor webhook deliveries** in Stripe Dashboard:
   - Go to: https://dashboard.stripe.com/webhooks
   - Click on your endpoint
   - Check recent deliveries for success/failure

## 🎯 Summary

**Local Development:** ✅ Working
- Webhook forwarding active
- Events being received
- Plan updates functioning correctly

**Production:** ⏳ Ready to configure
- Script created: `scripts/setup-production-webhook.sh`
- Documentation created: `docs/STRIPE_WEBHOOK_SETUP.md`
- Run script after deploying to production

**Code Changes Made:**
- ✅ Added comprehensive logging to webhook handlers
- ✅ Improved error messages for debugging
- ✅ Validated subscription processing logic
