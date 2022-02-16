-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsibleId_fkey";

-- AlterTable
ALTER TABLE "DashboardUser" ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "updated_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "responsibleId" SET NOT NULL,
ALTER COLUMN "due_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "updated_date",
ALTER COLUMN "created_date" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
