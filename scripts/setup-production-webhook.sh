#!/bin/bash

# ===========================================
# Production Webhook Setup Script
# ===========================================
# This script creates a webhook endpoint in Stripe for production use.
# Run this script AFTER deploying your API to production.

set -e

echo "🎯 Stripe Production Webhook Setup"
echo "===================================="
echo ""

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "❌ Error: Stripe CLI is not installed"
    echo "Install it from: https://stripe.com/docs/stripe-cli"
    exit 1
fi

# Check if logged in to Stripe
if ! stripe config --list &> /dev/null; then
    echo "❌ Error: Not logged in to Stripe"
    echo "Run: stripe login"
    exit 1
fi

# Get production URL
echo "📝 Enter your production API URL (without trailing slash):"
echo "   Example: https://api.yourdomain.com"
read -p "   URL: " PRODUCTION_URL

if [ -z "$PRODUCTION_URL" ]; then
    echo "❌ Error: URL cannot be empty"
    exit 1
fi

# Construct webhook endpoint URL
WEBHOOK_URL="${PRODUCTION_URL}/api/v1/billing/webhook"

echo ""
echo "📡 Creating webhook endpoint..."
echo "   URL: $WEBHOOK_URL"
echo ""

# Create webhook endpoint
RESULT=$(stripe webhook_endpoints create \
  --url "$WEBHOOK_URL" \
  --enabled-event checkout.session.completed \
  --enabled-event customer.subscription.created \
  --enabled-event customer.subscription.updated \
  --enabled-event customer.subscription.deleted \
  --description "DojoCountdown Production Webhooks" \
  --output json)

# Extract webhook endpoint ID and signing secret
ENDPOINT_ID=$(echo "$RESULT" | grep -o '"id": *"we_[^"]*"' | cut -d'"' -f4)
SIGNING_SECRET=$(echo "$RESULT" | grep -o '"secret": *"whsec_[^"]*"' | cut -d'"' -f4)

echo "✅ Webhook endpoint created successfully!"
echo ""
echo "📋 Webhook Details:"
echo "   Endpoint ID: $ENDPOINT_ID"
echo "   URL: $WEBHOOK_URL"
echo ""
echo "🔐 IMPORTANT: Copy this signing secret to your production .env file:"
echo ""
echo "   STRIPE_WEBHOOK_SECRET=\"$SIGNING_SECRET\""
echo ""
echo "⚠️  Save this secret now! You won't be able to see it again."
echo ""
echo "📝 Next steps:"
echo "   1. Add the signing secret to your production environment variables"
echo "   2. Restart your production API server"
echo "   3. Test with: stripe trigger customer.subscription.created"
echo "   4. Verify in Stripe Dashboard: https://dashboard.stripe.com/webhooks"
echo ""

# Save to file
cat > /tmp/stripe_webhook_production.txt << EOF
Stripe Production Webhook Configuration
========================================
Created: $(date)

Endpoint ID: $ENDPOINT_ID
Endpoint URL: $WEBHOOK_URL
Signing Secret: $SIGNING_SECRET

Environment Variable:
STRIPE_WEBHOOK_SECRET="$SIGNING_SECRET"

Subscribed Events:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted

Next Steps:
1. Add signing secret to production .env
2. Restart production API server
3. Test the webhook endpoint
4. Monitor webhook deliveries in Stripe Dashboard
EOF

echo "💾 Configuration saved to: /tmp/stripe_webhook_production.txt"
echo ""
