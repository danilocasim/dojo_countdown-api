-- PayMongo Migration
-- Rename Stripe fields to PayMongo equivalents
-- Run with: npx prisma migrate dev --name migrate_stripe_to_paymongo

-- Rename columns (PostgreSQL)
ALTER TABLE users RENAME COLUMN "stripeCustomerId" TO "paymongoCustomerId";
ALTER TABLE users RENAME COLUMN "stripeSubscriptionId" TO "paymongoSubscriptionId";
ALTER TABLE users RENAME COLUMN "stripePriceId" TO "paymongoPlanId";

-- Update index
DROP INDEX IF EXISTS "users_stripeCustomerId_key";
CREATE UNIQUE INDEX "users_paymongoCustomerId_key" ON users("paymongoCustomerId");
