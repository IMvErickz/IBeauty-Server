/*
  Warnings:

  - You are about to drop the column `agendaDiaId` on the `AgendaHorario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AgendaHorario" DROP CONSTRAINT "AgendaHorario_agendaDiaId_fkey";

-- AlterTable
ALTER TABLE "AgendaHorario" DROP COLUMN "agendaDiaId";

-- CreateTable
CREATE TABLE "_AgendaDiaToAgendaHorario" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgendaDiaToAgendaHorario_AB_unique" ON "_AgendaDiaToAgendaHorario"("A", "B");

-- CreateIndex
CREATE INDEX "_AgendaDiaToAgendaHorario_B_index" ON "_AgendaDiaToAgendaHorario"("B");

-- AddForeignKey
ALTER TABLE "_AgendaDiaToAgendaHorario" ADD CONSTRAINT "_AgendaDiaToAgendaHorario_A_fkey" FOREIGN KEY ("A") REFERENCES "AgendaDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendaDiaToAgendaHorario" ADD CONSTRAINT "_AgendaDiaToAgendaHorario_B_fkey" FOREIGN KEY ("B") REFERENCES "AgendaHorario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
