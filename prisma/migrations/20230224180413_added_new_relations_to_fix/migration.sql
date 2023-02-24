/*
  Warnings:

  - You are about to drop the column `statusId` on the `agendastatus` table. All the data in the column will be lost.
  - You are about to drop the column `servicoId` on the `servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `agendastatus` DROP FOREIGN KEY `AgendaStatus_statusId_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_servicoId_fkey`;

-- AlterTable
ALTER TABLE `agendastatus` DROP COLUMN `statusId`,
    ADD COLUMN `agendadoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `produtosId` VARCHAR(191) NULL,
    ADD COLUMN `servicoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `agendadoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `servico` DROP COLUMN `servicoId`,
    ADD COLUMN `prestadorCNPJ` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_agendadoId_fkey` FOREIGN KEY (`agendadoId`) REFERENCES `Agendado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_prestadorCNPJ_fkey` FOREIGN KEY (`prestadorCNPJ`) REFERENCES `Prestador`(`CNPJ`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_produtosId_fkey` FOREIGN KEY (`produtosId`) REFERENCES `Produtos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgendaStatus` ADD CONSTRAINT `AgendaStatus_agendadoId_fkey` FOREIGN KEY (`agendadoId`) REFERENCES `Agendado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
