import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MinLength, IsNotEmpty, Min } from "class-validator";
import { Task } from "./task";
import { Dashboard } from "./dashboard";
@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn({ select: false, name: "created_date" })
  createdDate: Date;

  @Column()
  @UpdateDateColumn({ select: false, name: "updated_date" })
  modifiedDate: Date;

  @OneToMany(() => Task, (task) => task.responsible)
  tasks: Task[];

  @OneToMany(() => Dashboard, (dashboard) => dashboard.owner)
  dashboardList: Dashboard[];
}
