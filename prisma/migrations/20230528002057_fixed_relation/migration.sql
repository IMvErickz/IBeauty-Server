-- DropForeignKey
ALTER TABLE "AgendaDia" DROP CONSTRAINT "AgendaDia_servicoId_fkey";

-- CreateTable
CREATE TABLE "_AgendaDiaToServico" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgendaDiaToServico_AB_unique" ON "_AgendaDiaToServico"("A", "B");

-- CreateIndex
CREATE INDEX "_AgendaDiaToServico_B_index" ON "_AgendaDiaToServico"("B");

-- AddForeignKey
ALTER TABLE "_AgendaDiaToServico" ADD CONSTRAINT "_AgendaDiaToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "AgendaDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendaDiaToServico" ADD CONSTRAINT "_AgendaDiaToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
