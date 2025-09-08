/*
  Warnings:

  - You are about to drop the column `reward` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `xpReward` on the `Task` table. All the data in the column will be lost.
  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referredBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `totalEarnings` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The `status` column on the `UserTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `amount` on the `WalletHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `amount` on the `Withdrawal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The `status` column on the `Withdrawal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `WalletHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "public"."TaskType" AS ENUM ('CPA', 'CPC', 'SURVEY', 'AD_VIEW');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'PAUSED');

-- CreateEnum
CREATE TYPE "public"."UserTaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'APPROVED');

-- CreateEnum
CREATE TYPE "public"."WithdrawalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');

-- CreateEnum
CREATE TYPE "public"."WalletType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "public"."RewardType" AS ENUM ('CASH', 'AIRTIME', 'DATA', 'GIFT_CARD');

-- CreateEnum
CREATE TYPE "public"."RedemptionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_referredBy_fkey";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "reward",
DROP COLUMN "xpReward",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rewardCash" DECIMAL(65,30),
ADD COLUMN     "rewardNC" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."TaskType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."TaskStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "balance",
DROP COLUMN "referredBy",
DROP COLUMN "xp",
ADD COLUMN     "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lockUntil" TIMESTAMP(3),
ADD COLUMN     "nc" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "referredById" TEXT,
ADD COLUMN     "totalNC" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "public"."AccountStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "totalEarnings" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "public"."UserTask" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UserTaskStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."WalletHistory" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "type",
ADD COLUMN     "type" "public"."WalletType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Withdrawal" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "status",
ADD COLUMN     "status" "public"."WithdrawalStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Redemption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardType" "public"."RewardType" NOT NULL,
    "rewardValue" TEXT NOT NULL,
    "ncSpent" INTEGER NOT NULL,
    "status" "public"."RedemptionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_referralCode_idx" ON "public"."User"("referralCode");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "public"."User"("status");

-- CreateIndex
CREATE INDEX "User_league_nc_idx" ON "public"."User"("league", "nc");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Redemption" ADD CONSTRAINT "Redemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
