-- CreateTable
CREATE TABLE "PastServices" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT,
    "clientCPF" TEXT,

    CONSTRAINT "PastServices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PastServices_id_key" ON "PastServices"("id");

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastServices" ADD CONSTRAINT "PastServices_clientCPF_fkey" FOREIGN KEY ("clientCPF") REFERENCES "Client"("CPF") ON DELETE SET NULL ON UPDATE CASCADE;
