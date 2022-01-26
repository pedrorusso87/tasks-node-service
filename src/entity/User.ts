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

  @Column({ select: false })
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn({ select: false })
  createdDate: Date;

  @Column()
  @UpdateDateColumn({ select: false })
  modifiedDate: Date;

  @OneToMany(() => Task, (task) => task.responsible)
  tasks: Task[];
}
