/*
  Warnings:

  - Added the required column `userId` to the `Stories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stories" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Stories" ADD CONSTRAINT "Stories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
