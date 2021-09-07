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
  TeamEntity,
  WorkerEntity
} from "./entities/project.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    @InjectRepository(WorkerEntity)
    private workerRepository: Repository<WorkerEntity>,

    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,

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

  async create(createProjectDto: CreateProjectDto): Promise<any> {
    let project = this.projectRepository.create(
      {
        project_name: createProjectDto.project_name,
        nda: createProjectDto.nda,
        link_to_project_folder: createProjectDto.link_to_project_folder,
        budget: createProjectDto.budget,
        client: createProjectDto.client,
        description: createProjectDto.description,
        otrasl: createProjectDto.otrasl,
        link_to_presentation: createProjectDto.link_to_presentation,
        state_of_project: createProjectDto.state_of_project,
        terms_from: createProjectDto.terms_from,
        terms_to: createProjectDto.terms_to,
        problems_and_solvings: createProjectDto.problems_and_solvings
      }
    )

    const technologiesList: TechnologyEntity[] = [];
    if (createProjectDto.technologies){
      for (const some of createProjectDto.technologies) {
        const technologyEntinity = new TechnologyEntity();
        technologyEntinity.technology = some.technology;
        //technologyEntinity.projects = project;
        technologiesList.push(technologyEntinity);
      }
    }

    const clocksList: ClockEntity[] = [];
    if (createProjectDto.clock_estimation){
      for (const some of createProjectDto.clock_estimation) {
        const clockEntinity = new ClockEntity();
        clockEntinity.clock = some.clock;
        clockEntinity.direction = some.direction;
        //clockEntinity.projects = project;
        clocksList.push(clockEntinity);
      }
    }

    const caseBehanceList: LinkCaseEntity[] = [];
    if (createProjectDto.links_to_case_behance_or_our_site){
      for (const some of createProjectDto.links_to_case_behance_or_our_site) {
        const linkCaseEntinity = new LinkCaseEntity();
        linkCaseEntinity.link_case = some.link_case;
        //linkCaseEntinity.projects = project;
        caseBehanceList.push(linkCaseEntinity);
      }
    }

    const nominationsList: NominationEntity[] = [];
    if (createProjectDto.nominations){
      for (const some of createProjectDto.nominations) {
        const nominationsEntinity = new NominationEntity();
        nominationsEntinity.title = some.title;
        nominationsEntinity.description = some.description;
        nominationsEntinity.link = some.link;
        //nominationsEntinity.projects = project;
        nominationsList.push(nominationsEntinity);
      }
    }

    const storeSiteList: StoreSiteLinkEntity[] = [];
    if (createProjectDto.links_to_store_site){
      for (const some of createProjectDto.links_to_store_site) {
        const storeSiteEntinity = new StoreSiteLinkEntity();
        storeSiteEntinity.link = some.link;
        //storeSiteEntinity.projects = project;
        storeSiteList.push(storeSiteEntinity);
      }
    }

    const workDirectionsList: WorkDirectionEntity[] = [];
    if (createProjectDto.directions_of_work){
      for (const some of createProjectDto.directions_of_work) {
        const workDirectionsEntinity = new WorkDirectionEntity();
        workDirectionsEntinity.work_direction = some.work_direction;
        //workDirectionsEntinity.projects = project;
        workDirectionsList.push(workDirectionsEntinity);
      }
    }

    const workerProjectsList: TeamEntity[] = [];
    if (createProjectDto.teams){
      for (const some of createProjectDto.teams) {
        const workerProjectsEntinity = new TeamEntity();
        workerProjectsEntinity.workers = [];
        workerProjectsEntinity.team_work_direction = some.team_work_direction;

        for (const worker of some.workers) {
          const workerEntinity = new WorkerEntity();
          workerEntinity.worker = worker.worker;
          /*try{
            this.workerRepository.save(workerEntinity);
          }
          catch (e) {
            console.log(e);
            return {success: false};
          }*/
          workerProjectsEntinity.workers.push(workerEntinity);
        }
        //workerProjectsEntinity.projects = project;
        workerProjectsList.push(workerProjectsEntinity);
      }
    }

    project.teams = workerProjectsList;
    project.clock_estimation = clocksList;
    project.directions_of_work = workDirectionsList;
    project.links_to_store_site = storeSiteList;
    project.nominations = nominationsList;
    project.links_to_case_behance_or_our_site = caseBehanceList;
    project.technologies = technologiesList;

    console.log(createProjectDto.project_name + ' ТУТ ТУТ ОНО ТУТ ТУТ');

    try{
      await this.projectRepository.save(project);

      return project;
    }
    catch (e){
      console.log(e);
      return {success: false};
    }
  }

  /*async findAll(sort: {field: string, order: "ASC"|"DESC"}, pagination: {page: number, perPage: number}, filter: {id: string}, res: any): Promise<any> {
    let query = await this.projectRepository.createQueryBuilder("project_entity");
    if (filter){
      query.where(":columnString LIKE :filterString")
        .setParameters({filterString: '%' + filter.id + '%', columnString: "project_name"});
    }
    if (pagination){
      query.offset((pagination.page - 1) * pagination.perPage)
        .limit(pagination.page * pagination.perPage - (pagination.page - 1) * pagination.perPage);
    }
    if (sort){
      query.addOrderBy(sort.field, sort.order);
    }
    let queryAndCount = await query.getManyAndCount();
    res.header("X-Total-Count", queryAndCount[1]);
    return queryAndCount[0];
  }*/

  async findAll(sort: string, order: 'ASC'|'DESC', page: number, perPage: number, filter: string, res: any): Promise<any> {
    console.log(sort, order, filter, page, perPage);

    let query = await this.projectRepository.createQueryBuilder("project_entity");
    if (filter){
      query.where("project_name LIKE :filterString")
        .setParameters({filterString: '%' + filter + '%', columnString: "project_name"});
    }
    if (page && perPage){
      query.offset((page - 1) * perPage)
        .limit(perPage);
    }
    if (sort && order){
      query.addOrderBy(sort, order);
    }
    let queryAndCount = await query.getManyAndCount();
    res.header("X-Total-Count", queryAndCount[1]);

    

    return queryAndCount[0];
  }

  async findOne(id: number) {
    let project: ProjectEntity = await this.projectRepository.findOne({ where: { id: id } });

    let teams: TeamEntity[] = await this.teamRepository.find({where: {projects: project}});
    for (const i in teams){
      const team: WorkerEntity[] = await this.workerRepository.find( {where: {team: teams[i]}});
      teams[i].workers = team;
    }

    project.teams = teams;
    project.clock_estimation = await this.clockRepository.find({where: {projects: project}});
    project.directions_of_work = await this.workDirectionRepository.find({where: {projects: project}});
    project.links_to_store_site = await this.storeSiteRepository.find({where: {projects: project}});
    project.nominations = await this.nominationRepository.find({where: {projects: project}});
    project.links_to_case_behance_or_our_site = await this.linkCaseRepository.find({where: {projects: project}});
    project.technologies = await this.technologyRepository.find({where: {projects: project}});

    return project;
  }

  async remove(id: number) {
    return this.projectRepository.delete({id: id});
  }

  async update(number: number, createProjectDto: UpdateProjectDto) {
    let project = this.projectRepository.create(
      {
        id: createProjectDto.id,
        project_name: createProjectDto.project_name,
        nda: createProjectDto.nda,
        link_to_project_folder: createProjectDto.link_to_project_folder,
        budget: createProjectDto.budget,
        client: createProjectDto.client,
        description: createProjectDto.description,
        otrasl: createProjectDto.otrasl,
        link_to_presentation: createProjectDto.link_to_presentation,
        state_of_project: createProjectDto.state_of_project,
        terms_from: createProjectDto.terms_from,
        terms_to: createProjectDto.terms_to,
        problems_and_solvings: createProjectDto.problems_and_solvings
      }
    )

    const technologiesList: TechnologyEntity[] = [];
    for (const some of createProjectDto.technologies) {
      const technologyEntinity = new TechnologyEntity();
      technologyEntinity.technology = some.technology;
      technologyEntinity.projects = project;
      technologiesList.push(technologyEntinity);
    }

    const clocksList: ClockEntity[] = [];
    for (const some of createProjectDto.clock_estimation) {
      const clockEntinity = new ClockEntity();
      clockEntinity.clock = some.clock;
      clockEntinity.direction = some.direction;
      clockEntinity.projects = project;
      clocksList.push(clockEntinity);
    }

    const caseBehanceList: LinkCaseEntity[] = [];
    for (const some of createProjectDto.links_to_case_behance_or_our_site) {
      const linkCaseEntinity = new LinkCaseEntity();
      linkCaseEntinity.link_case = some.link_case;
      linkCaseEntinity.projects = project;
      caseBehanceList.push(linkCaseEntinity);
    }

    const nominationsList: NominationEntity[] = [];
    for (const some of createProjectDto.nominations) {
      const nominationsEntinity = new NominationEntity();
      nominationsEntinity.title = some.title;
      nominationsEntinity.description = some.description;
      nominationsEntinity.link = some.link;
      nominationsEntinity.projects = project;
      nominationsList.push(nominationsEntinity);
    }

    const storeSiteList: StoreSiteLinkEntity[] = [];
    for (const some of createProjectDto.links_to_store_site) {
      const storeSiteEntinity = new StoreSiteLinkEntity();
      storeSiteEntinity.link = some.link;
      storeSiteEntinity.projects = project;
      storeSiteList.push(storeSiteEntinity);
    }

    const workDirectionsList: WorkDirectionEntity[] = [];
    for (const some of createProjectDto.directions_of_work) {
      const workDirectionsEntinity = new WorkDirectionEntity();
      workDirectionsEntinity.work_direction = some.work_direction;
      workDirectionsEntinity.projects = project;
      workDirectionsList.push(workDirectionsEntinity);
    }

    const workerProjectsList: TeamEntity[] = [];
    if (createProjectDto.teams){
      for (const some of createProjectDto.teams) {
        const workerProjectsEntinity = new TeamEntity();
        workerProjectsEntinity.workers = [];
        workerProjectsEntinity.team_work_direction = some.team_work_direction;

        for (const worker of some.workers) {
          const workerEntinity = new WorkerEntity();
          workerEntinity.worker = worker.worker;
          workerProjectsEntinity.workers.push(workerEntinity);
        }
        workerProjectsList.push(workerProjectsEntinity);
      }
    }

    project.teams = workerProjectsList;
    project.clock_estimation = clocksList;
    project.directions_of_work = workDirectionsList;
    project.links_to_store_site = storeSiteList;
    project.nominations = nominationsList;
    project.links_to_case_behance_or_our_site = caseBehanceList;
    project.technologies = technologiesList;

    try{
      await this.projectRepository.save(project);

      return this.projectRepository.findOne({where: {id: number}});
    }
    catch (e){
      console.log(e);
      return {success: false};
    }
  }
}
