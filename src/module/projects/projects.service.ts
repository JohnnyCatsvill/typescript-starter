import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {Repository} from 'typeorm';
import {
  ProjectEntity,
  TechnologyEntity,
  ClockEntity,
  NominationEntity,
  LinkCaseEntity,
  StoreSiteLinkEntity,
  WorkDirectionEntity,
  WorkerProjectEntity,
  WorkerEntity
} from "./entities/project.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    @InjectRepository(WorkerEntity)
    private workerRepository: Repository<WorkerEntity>,

    @InjectRepository(WorkerProjectEntity)
    private workerProjectRepository: Repository<WorkerProjectEntity>,

    @InjectRepository(TechnologyEntity)
    private technologyRepository: Repository<TechnologyEntity>,

    @InjectRepository(StoreSiteLinkEntity)
    private storeSiteRepository: Repository<StoreSiteLinkEntity>,

    @InjectRepository(LinkCaseEntity)
    private linkCaseRepository: Repository<LinkCaseEntity>,

    @InjectRepository(WorkDirectionEntity)
    private workDirectionRepository: Repository<WorkDirectionEntity>,

    @InjectRepository(NominationEntity)
    private nominationRepository: Repository<NominationEntity>,

    @InjectRepository(ClockEntity)
    private clockRepository: Repository<ClockEntity>,
  ) {
  }

  async create(createProjectDto: CreateProjectDto): Promise<{ success: boolean }> {
    let project = this.projectRepository.create(
      {
        project_name: createProjectDto.projectName,
        nda: createProjectDto.nda,
        projectLink: createProjectDto.projectLink,
        budget: createProjectDto.budget,
        client: createProjectDto.client,
        description: createProjectDto.description,
        otrasl: createProjectDto.otrasl,
        presentationLink: createProjectDto.presentationLink,
        status: createProjectDto.status,
        timings: createProjectDto.timings,
        troubles: createProjectDto.troubles
      }
    )

    const technologiesList: TechnologyEntity[] = [];
    for (const technology of createProjectDto.technologies) {
      const technologyEntinity = new TechnologyEntity();
      technologyEntinity.technologies = technology;
      technologyEntinity.projects = project;
      technologiesList.push(technologyEntinity);
    }

    const clocksList: ClockEntity[] = [];
    for (const some of createProjectDto.clocks) {
      const clockEntinity = new ClockEntity();
      clockEntinity.clock = some.clock;
      clockEntinity.direction = some.direction;
      clockEntinity.projects = project;
      clocksList.push(clockEntinity);
    }

    const caseBehanceList: LinkCaseEntity[] = [];
    for (const some of createProjectDto.caseBehanceLinks) {
      const linkCaseEntinity = new LinkCaseEntity();
      linkCaseEntinity.linkCase = some;
      linkCaseEntinity.projects = project;
      caseBehanceList.push(linkCaseEntinity);
    }

    const nominationsList: NominationEntity[] = [];
    for (const some of createProjectDto.nominations) {
      const nominationsEntinity = new NominationEntity();
      nominationsEntinity.nominationTitle = some.title;
      nominationsEntinity.description = some.description;
      nominationsEntinity.link = some.link;
      nominationsEntinity.projects = project;
      nominationsList.push(nominationsEntinity);
    }

    const storeSiteList: StoreSiteLinkEntity[] = [];
    for (const some of createProjectDto.storeSiteLinks) {
      const storeSiteEntinity = new StoreSiteLinkEntity();
      storeSiteEntinity.link = some;
      storeSiteEntinity.projects = project;
      storeSiteList.push(storeSiteEntinity);
    }

    const workDirectionsList: WorkDirectionEntity[] = [];
    for (const some of createProjectDto.workDirections) {
      const workDirectionsEntinity = new WorkDirectionEntity();
      workDirectionsEntinity.workDirection = some;
      workDirectionsEntinity.projects = project;
      workDirectionsList.push(workDirectionsEntinity);
    }

    const workerProjectsList: WorkerProjectEntity[] = [];
    for (const some of createProjectDto.workerProjects) {
      for (const worker of some.workers) {
        const workerProjectsEntinity = new WorkerProjectEntity();
        workerProjectsEntinity.directionName = some.direction
        const workerEntinity = new WorkerEntity()
        workerEntinity.worker = worker;
        try{
          this.workerRepository.save(workerEntinity);
        }
        catch (e) {
          console.log(e);
          return {success: false};
        }
        workerProjectsEntinity.worker = workerEntinity;
        workerProjectsEntinity.projectName = project;
        workerProjectsList.push(workerProjectsEntinity);
      }
    }

    project.workerProjects = workerProjectsList;
    project.workTimes = clocksList;
    project.workDirections = workDirectionsList;
    project.storeSiteLinks = storeSiteList;
    project.nominations = nominationsList;
    project.caseBehanceLinks = caseBehanceList;
    project.technologies = technologiesList;

    console.log(createProjectDto.projectName + ' ТУТ ТУТ ОНО ТУТ ТУТ');

    try{
      await this.projectRepository.save(project);/*
      this.clockRepository.save(clocksList);
      this.linkCaseRepository.save(caseBehanceList);
      this.nominationRepository.save(nominationsList);
      this.storeSiteRepository.save(storeSiteList);
      this.technologyRepository.save(technologiesList);
      this.workDirectionRepository.save(workDirectionsList);
      this.workerProjectRepository.save(workerProjectsList);*/

      return {success: true};
    }
    catch (e){
      console.log(e);
      return {success: false};
    }


  }

  async findAll(search: string, filter: string): Promise<ProjectEntity[]> {
    //let queryString = 'SELECT * FROM project_entity WHERE project_name LIKE "%?%"';
    //await this.projectRepository.query(queryString, [search, filter]);
    if(search == undefined) {
      search = "";
    }
    if(filter == undefined) {
      filter = "";
    }
    return await this.projectRepository
      .createQueryBuilder("project_entity")
      .where("project_name LIKE :searchString AND project_name <> :filterString")
      .setParameters({searchString: '%' + search + '%', filterString: filter })
      .getMany();

    //return await this.projectRepository.find({where: {project_name: search}})
    //return await this.projectRepository.query(queryString, [search]);
  }

  async findOne(id: number) {
    let project: ProjectEntity = await this.projectRepository.findOne({ where: { id_project: id } });

    project.workerProjects = await this.workerProjectRepository.find({where: {projectName: project}});
    project.workTimes = await this.clockRepository.find({where: {projects: project}});
    project.workDirections = await this.workDirectionRepository.find({where: {projects: project}});
    project.storeSiteLinks = await this.storeSiteRepository.find({where: {projects: project}});
    project.nominations = await this.nominationRepository.find({where: {projects: project}});
    project.caseBehanceLinks = await this.linkCaseRepository.find({where: {projects: project}});
    project.technologies = await this.technologyRepository.find({where: {projects: project}});

    return project;
  }

  /*update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }*/
}
