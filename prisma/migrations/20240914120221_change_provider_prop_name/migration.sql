/*
  Warnings:

  - You are about to drop the column `provider_offer_id` on the `offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offers" DROP COLUMN "provider_offer_id",
ADD COLUMN     "provider" TEXT;
