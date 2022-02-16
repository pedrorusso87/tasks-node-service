-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "due_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "responsibleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
