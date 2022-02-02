import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { MinLength, IsNotEmpty, Min, IsNumber } from "class-validator";
import { Status } from "./status";
import { Priority } from "./priority";
import { User } from "./user";

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

  @Column()
  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => Status)
  @JoinColumn({ name: "status_id" })
  @IsNotEmpty()
  status: Status;

  @ManyToOne(() => Priority)
  @JoinColumn({ name: "priority_id" })
  @IsNotEmpty()
  priority: Priority;
}
