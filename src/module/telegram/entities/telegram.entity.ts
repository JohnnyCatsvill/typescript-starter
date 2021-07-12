import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class TelegramEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => TelegramLinkEntity, v => v.entity)
  links?: TelegramLinkEntity[];
}

@Entity()
export class TelegramLinkEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  link: string;

  @ManyToOne(()=> TelegramEntity, v => v.links)
  entity: TelegramEntity;
}
