-- DropForeignKey
ALTER TABLE "Stories" DROP CONSTRAINT "Stories_userId_fkey";

-- AlterTable
ALTER TABLE "Stories" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Stories" ADD CONSTRAINT "Stories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
