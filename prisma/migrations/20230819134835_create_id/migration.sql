-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "CPF" TEXT,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "cellNumber" TEXT NOT NULL,
    "dateBirth" TEXT NOT NULL,
    "scheduledoId" TEXT,
    "AddressCep" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "cellNumber" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION,
    "AddressCep" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "NameService" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION,
    "providerId" TEXT,

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
    "day" TEXT NOT NULL,
    "scheduledId" TEXT,
    "ServiceId" TEXT,

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleHour" (
    "id" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "scheduleId" TEXT,

    CONSTRAINT "ScheduleHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleStatus" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduledId" TEXT,

    CONSTRAINT "ScheduleStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduled" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Scheduled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastServices" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT,
    "paymentId" TEXT,
    "clientId" TEXT,

    CONSTRAINT "PastServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("cep")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Method" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProviderToScheduleDay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ScheduleDayToScheduleHour" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_CPF_key" ON "Client"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_id_key" ON "Provider"("id");

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
CREATE UNIQUE INDEX "ScheduleHour_hour_key" ON "ScheduleHour"("hour");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleStatus_id_key" ON "ScheduleStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleStatus_Name_key" ON "ScheduleStatus"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduled_id_key" ON "Scheduled"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PastServices_id_key" ON "PastServices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToScheduleDay_AB_unique" ON "_ProviderToScheduleDay"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToScheduleDay_B_index" ON "_ProviderToScheduleDay"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleDayToScheduleHour_AB_unique" ON "_ScheduleDayToScheduleHour"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleDayToScheduleHour_B_index" ON "_ScheduleDayToScheduleHour"("B");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_AddressCep_fkey" FOREIGN KEY ("AddressCep") REFERENCES "Address"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "Scheduled" ADD CONSTRAINT "Scheduled_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToScheduleDay" ADD CONSTRAINT "_ProviderToScheduleDay_A_fkey" FOREIGN KEY ("A") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToScheduleDay" ADD CONSTRAINT "_ProviderToScheduleDay_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" ADD CONSTRAINT "_ScheduleDayToScheduleHour_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" ADD CONSTRAINT "_ScheduleDayToScheduleHour_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduleHour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
