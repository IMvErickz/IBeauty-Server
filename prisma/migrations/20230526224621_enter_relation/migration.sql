-- AlterTable
ALTER TABLE "AgendaDia" ADD COLUMN     "servicoId" TEXT;

-- AddForeignKey
ALTER TABLE "AgendaDia" ADD CONSTRAINT "AgendaDia_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
