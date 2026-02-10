# 🚀 Quick Reference: Stripe Webhooks

## 🎯 Problem
**Plan doesn't update after Stripe payment**

## ✅ Solution
Webhook endpoint was not configured in Stripe. Webhooks notify your server when payments complete.

---

## 🧪 Local Development (Testing Now)

### Start webhook forwarding:
```bash
stripe listen --forward-to localhost:3002/api/v1/billing/webhook
```

### Test it works:
```bash
stripe trigger customer.subscription.created
```

### Check logs:
```bash
tail -f /tmp/stripe_listen.log
```

---

## 🌍 Production Setup (After Deployment)

### Run the setup script:
```bash
cd /home/danilo/repos/dojo-countdown/dojo-countdown-api
./scripts/setup-production-webhook.sh
```

### Or manually via Stripe Dashboard:
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/v1/billing/webhook`
4. Events: Select these 4 events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **signing secret**
6. Add to production `.env`:
   ```
   STRIPE_WEBHOOK_SECRET="whsec_xxx"
   ```
7. Restart server

---

## 🔍 Verify It Works

### Check webhook was received:
```bash
# Stripe CLI logs
tail -20 /tmp/stripe_listen.log | grep customer.subscription

# Should show:
# --> customer.subscription.created [evt_xxx]
# <-- [200] POST http://localhost:3002/api/v1/billing/webhook
```

### Check plan updated:
```sql
SELECT email, plan, subscription_status 
FROM users 
WHERE email = 'your@email.com';
```

Should show:
- `plan`: BOOTSTRAP (or STARTUP/ENTERPRISE)
- `subscription_status`: active

---

## 📚 Full Documentation

- **Setup Guide:** `docs/STRIPE_WEBHOOK_SETUP.md`
- **Test Results:** `docs/WEBHOOK_TESTING_RESULTS.md`
- **Production Script:** `scripts/setup-production-webhook.sh`

---

## 🆘 Common Issues

| Issue | Fix |
|-------|-----|
| Plan not updating | Check webhook forwarding is running |
| 400 signature error | Update `STRIPE_WEBHOOK_SECRET` in `.env` |
| Events not received | Check server is running on correct port |
| Wrong plan assigned | Verify price IDs in `.env` match Stripe |

---

## ✅ Current Status

**Local:**
- ✅ Webhook forwarding active
- ✅ Server receiving events  
- ✅ Plan updates working

**Production:**
- ⏳ Ready to configure after deployment
- ⏳ Run `setup-production-webhook.sh`
- ⏳ Add webhook secret to production env
