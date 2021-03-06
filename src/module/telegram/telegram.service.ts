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

  async findAll(sort: string, order: 'ASC'|'DESC', page: number, perPage: number, filter: string, res: any): Promise<any> {
    
    filter = filter.replace('{', "").replace('}', "").replace(/"/gi, "");
    let filterList = filter.split(",");

    let query = await this.telegramRepository.createQueryBuilder("telegram_entity");

    if (filter){

      for(let filterElem of filterList){

        let source = filterElem.split(":")[0];
        let value = filterElem.split(":")[1];

        if (source == "title"){
          query.andWhere("title LIKE :filterStringClient")
          .setParameters({filterStringTitle: '%' + value + '%'});
        }
        else if (source == "description"){
          query.andWhere("description LIKE :filterStringProject")
          .setParameters({filterStringDescription: '%' + value + '%'});
        }
      }
      
    }
    if (page & perPage){
      query.offset(page * perPage)
        .limit(perPage);
    }
    if (sort){
      query.addOrderBy(sort, order);
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
