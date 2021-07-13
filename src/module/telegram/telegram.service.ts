import { Injectable } from '@nestjs/common';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { TelegramEntity, TelegramLinkEntity } from "./entities/telegram.entity";
import { Repository } from "typeorm";

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TelegramEntity)
    private telegramRepository: Repository<TelegramEntity>,

    @InjectRepository(TelegramLinkEntity)
    private telegramLinkRepository: Repository<TelegramLinkEntity>,
  ) {
  }

  async create(createTelegramDto: CreateTelegramDto) {

    let telegram: TelegramEntity = {
      title: createTelegramDto.title,
      description: createTelegramDto.description,
      links: [],
    };

    for (const link of createTelegramDto.links) {
      telegram.links.push(new TelegramLinkEntity(link))
    }

    try{
      await this.telegramRepository.save(telegram);
    }
    catch(e){
      console.log(e);
      return { success: false };
    }
    return { success: true };
  }

  async findAll(): Promise<TelegramEntity[]> {
    let entities: TelegramEntity[] = await this.telegramRepository.find()
    for (const entity of entities) {
      let links: TelegramLinkEntity[] = await this.telegramLinkRepository.find({where: {entity: entity}});
      entity.links = links;
    }
    return entities;
  }

  findOne(id: number) {
    return `This action returns a #${id} telegram`;
  }

  update(id: number, updateTelegramDto: UpdateTelegramDto) {
    return `This action updates a #${id} telegram`;
  }

  remove(id: number) {
    return `This action removes a #${id} telegram`;
  }
}
