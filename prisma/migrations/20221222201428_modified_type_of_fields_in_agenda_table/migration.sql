/*
  Warnings:

  - You are about to drop the column `agendaId` on the `agendado` table. All the data in the column will be lost.
  - Changed the type of `dia` on the `agenda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `agendadoId` to the `Agendado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agenda` MODIFY `horario` TIME NOT NULL,
    DROP COLUMN `dia`,
    ADD COLUMN `dia` DATE NOT NULL;

-- AlterTable
ALTER TABLE `agendado` DROP COLUMN `agendaId`,
    ADD COLUMN `agendadoId` INTEGER NOT NULL;
