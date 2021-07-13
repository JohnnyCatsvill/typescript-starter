import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class TelegramEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => TelegramLinkEntity, v => v.entity, {cascade: true})
  links?: TelegramLinkEntity[];
}

@Entity()
export class TelegramLinkEntity {
  constructor(link: string) {
    this.link = link;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  link: string;

  @ManyToOne(()=> TelegramEntity, v => v.links, {onUpdate: "CASCADE", onDelete:"CASCADE"})
  entity: TelegramEntity;
}
