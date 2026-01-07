/*
  Warnings:

  - The values [STARTER,PRO] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "CountdownStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'DISABLED');

-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('FREE', 'BOOTSTRAP', 'STARTUP', 'ENTERPRISE');
ALTER TABLE "public"."users" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "plan" TYPE "Plan_new" USING ("plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "public"."Plan_old";
ALTER TABLE "users" ALTER COLUMN "plan" SET DEFAULT 'FREE';
COMMIT;

-- CreateTable
CREATE TABLE "countdowns" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "status" "CountdownStatus" NOT NULL DEFAULT 'ACTIVE',
    "styleConfig" JSONB NOT NULL DEFAULT '{}',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countdowns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_months" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "viewsUsed" INTEGER NOT NULL DEFAULT 0,
    "viewsLimit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usage_months_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "countdowns_ownerId_idx" ON "countdowns"("ownerId");

-- CreateIndex
CREATE INDEX "countdowns_status_idx" ON "countdowns"("status");

-- CreateIndex
CREATE INDEX "countdowns_ownerId_status_idx" ON "countdowns"("ownerId", "status");

-- CreateIndex
CREATE INDEX "usage_months_userId_idx" ON "usage_months"("userId");

-- CreateIndex
CREATE INDEX "usage_months_year_month_idx" ON "usage_months"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "usage_months_userId_year_month_key" ON "usage_months"("userId", "year", "month");

-- AddForeignKey
ALTER TABLE "countdowns" ADD CONSTRAINT "countdowns_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_months" ADD CONSTRAINT "usage_months_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
