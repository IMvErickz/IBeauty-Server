/*
  Warnings:

  - You are about to drop the column `agendadoId` on the `agendado` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Cliente_agendadoId_fkey` ON `cliente`;

-- AlterTable
ALTER TABLE `agendado` DROP COLUMN `agendadoId`;
