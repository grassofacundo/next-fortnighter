/*
  Warnings:

  - The primary key for the `JobPosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `HourPrice` on the `JobPosition` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `JobPosition` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `JobPosition` table. All the data in the column will be lost.
  - Added the required column `hourPrice` to the `JobPosition` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `JobPosition` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `JobPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobPositionId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosition" DROP CONSTRAINT "JobPosition_pkey",
DROP COLUMN "HourPrice",
DROP COLUMN "Id",
DROP COLUMN "Name",
ADD COLUMN     "hourPrice" INTEGER NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "jobPositionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
