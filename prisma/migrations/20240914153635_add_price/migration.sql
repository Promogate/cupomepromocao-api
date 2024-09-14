-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "discount_amount" TEXT,
ADD COLUMN     "old_price" DECIMAL(65,30),
ADD COLUMN     "price" DECIMAL(65,30);
