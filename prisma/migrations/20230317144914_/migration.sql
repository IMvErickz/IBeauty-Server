/*
  Warnings:

  - Added the required column `img` to the `Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestador` ADD COLUMN `img` VARCHAR(191) NOT NULL;
