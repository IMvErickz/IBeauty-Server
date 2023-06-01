/*
  Warnings:

  - Added the required column `Rating` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rating` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rating` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "Rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "Rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "Rating" DOUBLE PRECISION NOT NULL;
