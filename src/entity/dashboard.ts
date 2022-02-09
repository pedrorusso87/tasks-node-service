import { IsNotEmpty } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Task } from "./task";
import { User } from "./user";

@Entity("dashboards")
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @Column()
  @CreateDateColumn({ select: false })
  createdDate: Date;

  @Column()
  @UpdateDateColumn({ select: false })
  modifiedDate: Date;

  @OneToMany(() => Task, (task) => task.id)
  @JoinColumn({ name: "task_id" })
  tasks: Task[];
}
