-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_servicoId_fkey`;

-- AlterTable
ALTER TABLE `categoria` MODIFY `servicoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
