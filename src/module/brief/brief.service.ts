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

  async create(createBriefDto: CreateBriefDto): Promise<{ success: boolean }> {
    let brief = await this.briefRepository.create(createBriefDto);
    try{
      await this.briefRepository.save(brief);
    }
    catch (e) {
      console.log(e);
      return {success: false};
    }
    return {success: true};
  }

  async findAll(): Promise<BriefEntity[]> {
    return await this.briefRepository.find();
  }

  async findOne(id: number): Promise<BriefEntity> {
    return await this.briefRepository.findOne({where: {id: id}});
  }

  /*update(id: number, updateBriefDto: UpdateBriefDto) {
    return `This action updates a #${id} brief`;
  }

  remove(id: number) {
    return `This action removes a #${id} brief`;
  }*/
}
