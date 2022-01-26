import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  description: string;
}
