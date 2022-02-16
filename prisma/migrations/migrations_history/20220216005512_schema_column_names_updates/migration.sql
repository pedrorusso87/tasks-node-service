/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `dashboardId` on the `DashboardUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `DashboardUser` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dashboardId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priorityId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `responsibleId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Dashboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dashboard_id` to the `DashboardUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `DashboardUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy_Id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dashboard_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "DashboardUser" DROP CONSTRAINT "DashboardUser_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "DashboardUser" DROP CONSTRAINT "DashboardUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_priorityId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_statusId_fkey";

-- AlterTable
ALTER TABLE "Dashboard" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DashboardUser" DROP COLUMN "dashboardId",
DROP COLUMN "userId",
ADD COLUMN     "dashboard_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createdById",
DROP COLUMN "dashboardId",
DROP COLUMN "priorityId",
DROP COLUMN "responsibleId",
DROP COLUMN "statusId",
ADD COLUMN     "createdBy_Id" TEXT NOT NULL,
ADD COLUMN     "dashboard_id" TEXT NOT NULL,
ADD COLUMN     "priority_id" TEXT NOT NULL,
ADD COLUMN     "responsible_id" TEXT NOT NULL,
ADD COLUMN     "status_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_Id_fkey" FOREIGN KEY ("createdBy_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "Priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
