import { Injectable } from '@nestjs/common';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { TelegramEntity} from "./entities/telegram.entity";
import { Repository } from "typeorm";

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TelegramEntity)
    private telegramRepository: Repository<TelegramEntity>,
  ) {
  }

  async create(createTelegramDto: CreateTelegramDto) {

    let telegram: TelegramEntity = {
      title: createTelegramDto.title,
      description: createTelegramDto.description,
    };

    try{
      await this.telegramRepository.save(telegram);
    }
    catch(e){
      console.log(e);
      return { success: false };
    }
    return { success: true };
  }

  async findAll(sort: [string, "ASC"|"DESC"], range: [number, number], filter: [string, string], res: any): Promise<any> {
    let query = await this.telegramRepository.createQueryBuilder("telegram_entity");
    if (filter){
      query.where(":columnString LIKE :filterString")
        .setParameters({filterString: '%' + filter[1] + '%', columnString: filter[0]});
    }
    if (range){
      query.offset(range[0])
        .limit(range[1]- range[0]);
    }
    if (sort){
      query.addOrderBy(sort[0], sort[1]);
    }
    let queryAndCount = await query.getManyAndCount();
    res.header("X-Total-Count", queryAndCount[1]);
    return queryAndCount[0];
  }

  async findOne(id: number) {
    return await this.telegramRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateTelegramDto: UpdateTelegramDto) {
    let telegram: TelegramEntity = {
      id: updateTelegramDto.id,
      title: updateTelegramDto.title,
      description: updateTelegramDto.description,
    };

    try{
      await this.telegramRepository.save(telegram);
    }
    catch(e){
      console.log(e);
      return { success: false };
    }
    return { success: true };
  }

  async remove(id: number) {
    return this.telegramRepository.delete({id: id});
  }
}
