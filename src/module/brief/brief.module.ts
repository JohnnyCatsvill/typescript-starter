import { Module } from '@nestjs/common';
import { BriefService } from './brief.service';
import { BriefController } from './brief.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import {BriefEntity} from "./entities/brief.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BriefEntity])],
  controllers: [BriefController],
  providers: [BriefService]
})
export class BriefModule {}
