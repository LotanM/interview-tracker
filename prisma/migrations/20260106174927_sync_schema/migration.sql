/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - The `desireLevel` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `interviewer` on the `InterviewStage` table. All the data in the column will be lost.
  - You are about to drop the column `interviewerUrl` on the `InterviewStage` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `InterviewStage` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `InterviewStage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId,order]` on the table `InterviewStage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `InterviewStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `InterviewStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InterviewStage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationDesireLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "InterviewStageType" AS ENUM ('HR', 'TECHNICAL', 'ARCHITECTURE', 'ASSIGNMENT', 'MANAGER', 'CTO', 'OTHER');

-- CreateEnum
CREATE TYPE "InterviewStageLocation" AS ENUM ('IN_PERSON', 'ZOOM', 'GOOGLE_MEET', 'PHONE_CALL', 'OTHER');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewStage" DROP CONSTRAINT "InterviewStage_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId",
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
DROP COLUMN "desireLevel",
ADD COLUMN     "desireLevel" "ApplicationDesireLevel",
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InterviewStage" DROP COLUMN "interviewer",
DROP COLUMN "interviewerUrl",
DROP COLUMN "notes",
DROP COLUMN "title",
ADD COLUMN     "betterAnswerToday" TEXT,
ADD COLUMN     "interviewerName" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" "InterviewStageLocation",
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "outcome" TEXT,
ADD COLUMN     "preparationNotes" TEXT,
ADD COLUMN     "questionsAsked" TEXT,
ADD COLUMN     "reflectionNotes" TEXT,
ADD COLUMN     "type" "InterviewStageType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "whyItDidntGoWell" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_name_key" ON "Company"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewStage_applicationId_order_key" ON "InterviewStage"("applicationId", "order");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewStage" ADD CONSTRAINT "InterviewStage_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
