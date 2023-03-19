-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `enderecoCep` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `prestador` ADD COLUMN `enderecoCep` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Endereco` (
    `cep` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cep`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_enderecoCep_fkey` FOREIGN KEY (`enderecoCep`) REFERENCES `Endereco`(`cep`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestador` ADD CONSTRAINT `Prestador_enderecoCep_fkey` FOREIGN KEY (`enderecoCep`) REFERENCES `Endereco`(`cep`) ON DELETE SET NULL ON UPDATE CASCADE;
