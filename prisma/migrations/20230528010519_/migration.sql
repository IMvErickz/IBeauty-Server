/*
  Warnings:

  - You are about to drop the `AgendaDia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgendaHorario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgendaStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Agendado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prestador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AgendaDiaToAgendaHorario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AgendaDiaToServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AgendaDia" DROP CONSTRAINT "AgendaDia_agendadoId_fkey";

-- DropForeignKey
ALTER TABLE "AgendaHorario" DROP CONSTRAINT "AgendaHorario_agendaId_fkey";

-- DropForeignKey
ALTER TABLE "AgendaStatus" DROP CONSTRAINT "AgendaStatus_agendadoId_fkey";

-- DropForeignKey
ALTER TABLE "Agendado" DROP CONSTRAINT "Agendado_clienteCPF_fkey";

-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_produtosId_fkey";

-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_enderecoCep_fkey";

-- DropForeignKey
ALTER TABLE "Prestador" DROP CONSTRAINT "Prestador_enderecoCep_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_prestadorCNPJ_fkey";

-- DropForeignKey
ALTER TABLE "_AgendaDiaToAgendaHorario" DROP CONSTRAINT "_AgendaDiaToAgendaHorario_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendaDiaToAgendaHorario" DROP CONSTRAINT "_AgendaDiaToAgendaHorario_B_fkey";

-- DropForeignKey
ALTER TABLE "_AgendaDiaToServico" DROP CONSTRAINT "_AgendaDiaToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendaDiaToServico" DROP CONSTRAINT "_AgendaDiaToServico_B_fkey";

-- DropTable
DROP TABLE "AgendaDia";

-- DropTable
DROP TABLE "AgendaHorario";

-- DropTable
DROP TABLE "AgendaStatus";

-- DropTable
DROP TABLE "Agendado";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Endereco";

-- DropTable
DROP TABLE "Prestador";

-- DropTable
DROP TABLE "Produtos";

-- DropTable
DROP TABLE "Servico";

-- DropTable
DROP TABLE "_AgendaDiaToAgendaHorario";

-- DropTable
DROP TABLE "_AgendaDiaToServico";

-- CreateTable
CREATE TABLE "Client" (
    "CPF" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "cellNumber" TEXT NOT NULL,
    "dateBirth" TEXT NOT NULL,
    "scheduledoId" TEXT,
    "AddressCep" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("CPF")
);

-- CreateTable
CREATE TABLE "Provider" (
    "CNPJ" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "cellNumber" TEXT NOT NULL,
    "AddressCep" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("CNPJ")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "NameService" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ProviderCNPJ" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "NameCategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ServiceId" TEXT,
    "ProductsId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleDay" (
    "id" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "scheduledId" TEXT,
    "ServiceId" TEXT,

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleHour" (
    "id" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "scheduleId" TEXT,

    CONSTRAINT "ScheduleHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleStatus" (
    "id" TEXT NOT NULL,
    "NameStatus" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduledId" TEXT,

    CONSTRAINT "ScheduleStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduled" (
    "id" TEXT NOT NULL,
    "ClientCPF" TEXT,

    CONSTRAINT "Scheduled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("cep")
);

-- CreateTable
CREATE TABLE "_ScheduleDayToScheduleHour" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ScheduleDayToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_CPF_key" ON "Client"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_CNPJ_key" ON "Provider"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_NameCategory_key" ON "Category"("NameCategory");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleDay_id_key" ON "ScheduleDay"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleHour_id_key" ON "ScheduleHour"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleHour_horario_key" ON "ScheduleHour"("horario");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleStatus_id_key" ON "ScheduleStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleStatus_NameStatus_key" ON "ScheduleStatus"("NameStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduled_id_key" ON "Scheduled"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleDayToScheduleHour_AB_unique" ON "_ScheduleDayToScheduleHour"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleDayToScheduleHour_B_index" ON "_ScheduleDayToScheduleHour"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleDayToService_AB_unique" ON "_ScheduleDayToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleDayToService_B_index" ON "_ScheduleDayToService"("B");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_ProviderCNPJ_fkey" FOREIGN KEY ("ProviderCNPJ") REFERENCES "Provider"("CNPJ") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ServiceId_fkey" FOREIGN KEY ("ServiceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ProductsId_fkey" FOREIGN KEY ("ProductsId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDay" ADD CONSTRAINT "ScheduleDay_scheduledId_fkey" FOREIGN KEY ("scheduledId") REFERENCES "Scheduled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleHour" ADD CONSTRAINT "ScheduleHour_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Scheduled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleStatus" ADD CONSTRAINT "ScheduleStatus_scheduledId_fkey" FOREIGN KEY ("scheduledId") REFERENCES "Scheduled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduled" ADD CONSTRAINT "Scheduled_ClientCPF_fkey" FOREIGN KEY ("ClientCPF") REFERENCES "Client"("CPF") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" ADD CONSTRAINT "_ScheduleDayToScheduleHour_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" ADD CONSTRAINT "_ScheduleDayToScheduleHour_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduleHour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToService" ADD CONSTRAINT "_ScheduleDayToService_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToService" ADD CONSTRAINT "_ScheduleDayToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
