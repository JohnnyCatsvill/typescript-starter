import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  ProjectEntity,
  WorkerEntity,
  TeamEntity,
  WorkDirectionEntity,
  StoreSiteLinkEntity,
  LinkCaseEntity,
  NominationEntity,
  ClockEntity,
  TechnologyEntity
} from "./entities/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    ProjectEntity,
    WorkerEntity,
    TeamEntity,
    WorkDirectionEntity,
    StoreSiteLinkEntity,
    LinkCaseEntity,
    NominationEntity,
    ClockEntity,
    TechnologyEntity
  ])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
