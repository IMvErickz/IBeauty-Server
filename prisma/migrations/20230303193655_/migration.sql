/*
  Warnings:

  - You are about to drop the `agenda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `agenda` DROP FOREIGN KEY `Agenda_agendaId_fkey`;

-- DropTable
DROP TABLE `agenda`;

-- CreateTable
CREATE TABLE `AgendaDia` (
    `id` VARCHAR(191) NOT NULL,
    `dia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AgendaDia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgendaHorario` (
    `id` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `agendaId` VARCHAR(191) NULL,
    `agendaDiaId` VARCHAR(191) NULL,

    UNIQUE INDEX `AgendaHorario_id_key`(`id`),
    UNIQUE INDEX `AgendaHorario_horario_key`(`horario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AgendaHorario` ADD CONSTRAINT `AgendaHorario_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agendado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgendaHorario` ADD CONSTRAINT `AgendaHorario_agendaDiaId_fkey` FOREIGN KEY (`agendaDiaId`) REFERENCES `AgendaDia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
