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
@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @UpdateDateColumn()
  modifiedDate: Date;

  @OneToMany(() => Task, (task) => task.responsible)
  tasks: Task[];
}
