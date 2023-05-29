/*
  Warnings:

  - You are about to drop the `_ScheduleDayToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleDayToService" DROP CONSTRAINT "_ScheduleDayToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleDayToService" DROP CONSTRAINT "_ScheduleDayToService_B_fkey";

-- DropTable
DROP TABLE "_ScheduleDayToService";

-- CreateTable
CREATE TABLE "_ProviderToScheduleDay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToScheduleDay_AB_unique" ON "_ProviderToScheduleDay"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToScheduleDay_B_index" ON "_ProviderToScheduleDay"("B");

-- AddForeignKey
ALTER TABLE "_ProviderToScheduleDay" ADD CONSTRAINT "_ProviderToScheduleDay_A_fkey" FOREIGN KEY ("A") REFERENCES "Provider"("CNPJ") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToScheduleDay" ADD CONSTRAINT "_ProviderToScheduleDay_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
