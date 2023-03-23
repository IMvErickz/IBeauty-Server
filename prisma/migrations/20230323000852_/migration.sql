/*
  Warnings:

  - You are about to drop the column `senha` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `Senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `senha`,
    ADD COLUMN `Senha` VARCHAR(191) NOT NULL;
