-- CreateTable
CREATE TABLE `Cliente` (
    `CPF` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_CPF_key`(`CPF`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prestador` (
    `CNPJ` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `Senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Prestador_CNPJ_key`(`CNPJ`),
    UNIQUE INDEX `Prestador_email_key`(`email`),
    PRIMARY KEY (`CNPJ`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NomeServico` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `servicoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Servico_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCategoria` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `servicoId` INTEGER NOT NULL,

    UNIQUE INDEX `Categoria_id_key`(`id`),
    UNIQUE INDEX `Categoria_nomeCategoria_key`(`nomeCategoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horario` DATETIME(3) NOT NULL,
    `dia` INTEGER NOT NULL,
    `agendaId` INTEGER NOT NULL,

    UNIQUE INDEX `Agenda_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgendaStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeStatus` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `statusId` INTEGER NOT NULL,

    UNIQUE INDEX `AgendaStatus_id_key`(`id`),
    UNIQUE INDEX `AgendaStatus_nomeStatus_key`(`nomeStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agendaId` INTEGER NOT NULL,

    UNIQUE INDEX `Agendado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeProduto` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Produtos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Prestador`(`CNPJ`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agenda` ADD CONSTRAINT `Agenda_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agendado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgendaStatus` ADD CONSTRAINT `AgendaStatus_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Agendado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
