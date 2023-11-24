/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_AddressCep_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_AddressCep_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
