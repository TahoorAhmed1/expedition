/*
  Warnings:

  - You are about to drop the column `username` on the `Stories` table. All the data in the column will be lost.
  - Added the required column `name` to the `Stories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stories" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;
