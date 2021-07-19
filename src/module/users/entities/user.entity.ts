import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  login: string;

  @Column()
  hashPass: string;
}