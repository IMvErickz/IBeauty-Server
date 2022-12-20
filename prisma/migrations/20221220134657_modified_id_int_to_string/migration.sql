/*
  Warnings:

  - The primary key for the `agenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `agendado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `agendastatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `servico` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `agenda` DROP FOREIGN KEY `Agenda_agendaId_fkey`;

-- DropForeignKey
ALTER TABLE `agendastatus` DROP FOREIGN KEY `AgendaStatus_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_servicoId_fkey`;

-- AlterTable
ALTER TABLE `agenda` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `agendaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `agendado` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `agendastatus` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `statusId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `servicoId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `produtos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `servico` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agenda` ADD CONSTRAINT `Agenda_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agendado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgendaStatus` ADD CONSTRAINT `AgendaStatus_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Agendado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
