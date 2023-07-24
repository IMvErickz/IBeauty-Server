/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_paymentId_fkey";

-- AlterTable
ALTER TABLE "PastServices" ADD COLUMN     "paymentId" TEXT;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "paymentId";

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
