-- RenameIndex
ALTER INDEX "users_stripeCustomerId_idx" RENAME TO "users_paymongoCustomerId_idx";

-- RenameIndex
ALTER INDEX "users_stripeSubscriptionId_key" RENAME TO "users_paymongoSubscriptionId_key";
