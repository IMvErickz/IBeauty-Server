-- AlterTable
ALTER TABLE `agendadia` ADD COLUMN `agendadoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `AgendaDia` ADD CONSTRAINT `AgendaDia_agendadoId_fkey` FOREIGN KEY (`agendadoId`) REFERENCES `Agendado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
