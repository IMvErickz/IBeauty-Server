/*
  Warnings:

  - You are about to drop the column `horario` on the `ScheduleHour` table. All the data in the column will be lost.
  - You are about to drop the column `NameStatus` on the `ScheduleStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hour]` on the table `ScheduleHour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Name]` on the table `ScheduleStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hour` to the `ScheduleHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `ScheduleStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ScheduleHour_horario_key";

-- DropIndex
DROP INDEX "ScheduleStatus_NameStatus_key";

-- AlterTable
ALTER TABLE "ScheduleHour" DROP COLUMN "horario",
ADD COLUMN     "hour" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScheduleStatus" DROP COLUMN "NameStatus",
ADD COLUMN     "Name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleHour_hour_key" ON "ScheduleHour"("hour");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleStatus_Name_key" ON "ScheduleStatus"("Name");
