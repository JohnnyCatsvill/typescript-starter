import { Injectable } from '@nestjs/common';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BriefEntity } from "./entities/brief.entity";

@Injectable()
export class BriefService {
  constructor(
    @InjectRepository(BriefEntity)
    private briefRepository: Repository<BriefEntity>,
  ) {
  }

  async create(createBriefDto: CreateBriefDto): Promise<any> {
    let brief = await this.briefRepository.create(createBriefDto);
    try{
      await this.briefRepository.save(brief);
    }
    catch (e) {
      console.log(e);
      return {success: false};
    }
    return brief;
  }

  async findAll(sort: string, order: 'ASC'|'DESC', page: number, perPage: number, filter: string, res: any): Promise<any> {
    let query = await this.briefRepository.createQueryBuilder("brief_entity");
    if (filter){
      query.where("companyName LIKE :filterString")
        .setParameters({filterString: '%' + filter + '%'});
    }
    if (page && perPage){
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

  async findOne(id: number): Promise<BriefEntity> {
    return await this.briefRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateBriefDto: UpdateBriefDto): Promise<any> {
    let brief = await this.briefRepository.create(updateBriefDto);
    try{
      await this.briefRepository.save(brief);
    }
    catch (e) {
      console.log(e);
      return {success: false};
    }
    return brief;
  }

  async remove(id: number) {
    return await this.briefRepository.delete({id: id});
  }
}
