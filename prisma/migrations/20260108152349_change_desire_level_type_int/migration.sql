/*
  Warnings:

  - The `desireLevel` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "desireLevel",
ADD COLUMN     "desireLevel" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "ApplicationDesireLevel";
