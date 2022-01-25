import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { MinLength, IsNotEmpty, Min } from "class-validator";
import { Status } from "./status";
import { Priority } from "./priority";

@Entity("tasks")
export class Task {
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

  @OneToOne(() => Status)
  @JoinColumn()
  status: Status;

  @OneToOne(() => Priority)
  @JoinColumn()
  priority: Priority;
}
