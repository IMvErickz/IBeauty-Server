-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `servicoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
