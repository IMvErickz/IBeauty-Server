/*
  Warnings:

  - You are about to drop the column `dia` on the `ScheduleDay` table. All the data in the column will be lost.
  - Added the required column `day` to the `ScheduleDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduleDay" DROP COLUMN "dia",
ADD COLUMN     "day" TEXT NOT NULL;
