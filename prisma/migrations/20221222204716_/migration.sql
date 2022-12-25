/*
  Warnings:

  - A unique constraint covering the columns `[horario]` on the table `Agenda` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `agenda` DROP FOREIGN KEY `Agenda_agendaId_fkey`;

-- AlterTable
ALTER TABLE `agenda` MODIFY `horario` TIME NOT NULL,
    MODIFY `agendaId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Agenda_horario_key` ON `Agenda`(`horario`);

-- AddForeignKey
ALTER TABLE `Agenda` ADD CONSTRAINT `Agenda_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agendado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
