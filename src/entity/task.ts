import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Status } from "./status";
import { Priority } from "./priority";
import { User } from "./User";
import { Dashboard } from "./dashboard";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "responsible_id" })
  responsible: User;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({ name: "due_date", nullable: true })
  dueDate: Date;

  @Column({ name: "created_date" })
  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Status)
  @JoinColumn({ name: "status_id" })
  @IsNotEmpty()
  status: Status;

  @ManyToOne(() => Priority)
  @JoinColumn({ name: "priority_id" })
  @IsNotEmpty()
  priority: Priority;

  @ManyToOne(() => Dashboard)
  @JoinColumn({ name: "dashboard_id" })
  dashboard: Dashboard;
}
