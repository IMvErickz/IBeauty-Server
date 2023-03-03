-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `Cliente_agendadoId_fkey`;

-- AlterTable
ALTER TABLE `agendado` ADD COLUMN `clienteCPF` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Agendado` ADD CONSTRAINT `Agendado_clienteCPF_fkey` FOREIGN KEY (`clienteCPF`) REFERENCES `Cliente`(`CPF`) ON DELETE SET NULL ON UPDATE CASCADE;
