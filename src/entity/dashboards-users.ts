import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Dashboard } from "./dashboard";
import { User } from "./user";

@Entity("dashboards_users")
// This table is for storing the dashboards per user
export class DashboardTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  @CreateDateColumn({ select: false, name: "created_date" })
  createdDate: Date;

  @Column()
  @UpdateDateColumn({ select: false, name: "updated_date" })
  updatedDate: Date;

  @ManyToOne(() => Dashboard)
  @JoinColumn({ name: "dashboard_id" })
  dashboard: Dashboard;
}
