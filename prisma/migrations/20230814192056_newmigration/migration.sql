/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "JobPosition" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "HourPrice" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
