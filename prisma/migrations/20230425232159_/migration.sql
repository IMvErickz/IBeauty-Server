/*
  Warnings:

  - Added the required column `dateBirth` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `dateBirth` VARCHAR(191) NOT NULL;
