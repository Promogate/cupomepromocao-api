/*
  Warnings:

  - You are about to drop the column `provider_id` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_provider_id_fkey";

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "provider_id";

-- DropTable
DROP TABLE "stores";
