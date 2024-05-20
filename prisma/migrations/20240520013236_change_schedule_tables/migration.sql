/*
  Warnings:

  - You are about to drop the column `scheduledoId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `ScheduleDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleHour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scheduled` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProviderToScheduleDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ScheduleDayToScheduleHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScheduleDay" DROP CONSTRAINT "ScheduleDay_scheduledId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleHour" DROP CONSTRAINT "ScheduleHour_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleStatus" DROP CONSTRAINT "ScheduleStatus_scheduledId_fkey";

-- DropForeignKey
ALTER TABLE "Scheduled" DROP CONSTRAINT "Scheduled_clientId_fkey";

-- DropForeignKey
ALTER TABLE "_ProviderToScheduleDay" DROP CONSTRAINT "_ProviderToScheduleDay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProviderToScheduleDay" DROP CONSTRAINT "_ProviderToScheduleDay_B_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" DROP CONSTRAINT "_ScheduleDayToScheduleHour_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleDayToScheduleHour" DROP CONSTRAINT "_ScheduleDayToScheduleHour_B_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "scheduledoId";

-- DropTable
DROP TABLE "ScheduleDay";

-- DropTable
DROP TABLE "ScheduleHour";

-- DropTable
DROP TABLE "ScheduleStatus";

-- DropTable
DROP TABLE "Scheduled";

-- DropTable
DROP TABLE "_ProviderToScheduleDay";

-- DropTable
DROP TABLE "_ScheduleDayToScheduleHour";

-- CreateTable
CREATE TABLE "TimeInterval" (
    "id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "providerId" TEXT,

    CONSTRAINT "TimeInterval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observations" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "providerId" TEXT,
    "clientId" TEXT,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeInterval" ADD CONSTRAINT "TimeInterval_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
