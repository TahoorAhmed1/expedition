/*
  Warnings:

  - You are about to drop the column `author` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_author_fkey";

-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_author_fkey";

-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "quotation" TEXT;

-- AlterTable
ALTER TABLE "Stories" ADD COLUMN     "adminApproved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Journal";

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
