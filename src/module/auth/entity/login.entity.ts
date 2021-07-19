import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  login: string;

  @Column()
  hash: string;
}