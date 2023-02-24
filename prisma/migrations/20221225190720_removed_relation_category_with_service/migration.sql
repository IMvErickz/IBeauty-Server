/*
  Warnings:

  - You are about to drop the column `servicoId` on the `categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_servicoId_fkey`;

-- AlterTable
ALTER TABLE `agenda` MODIFY `horario` TIME NOT NULL;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `servicoId`;
