import { Dashboard } from "@prisma/client";
import { User } from "./User";

// This table is for storing the dashboards per user
export class DashboardUser {
  id: string;
  user: User;
  createdDate: Date;
  updatedDate: Date;
  dashboard: Dashboard;
}
