import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  project_name: string;

  @Column()
  otrasl: string;

  @Column()
  state_of_project: string;

  @Column()
  client: string;

  @Column()
  nda: string;

  @Column()
  budget?: number;

  @Column()
  description?: string;

  @Column()
  problems_and_solvings?: string;

  @OneToMany(type => TechnologyEntity, tech => tech.projects, {cascade: true})
  technologies?: TechnologyEntity[];

  @OneToMany(type => StoreSiteLinkEntity, link => link.projects, {cascade: true})
  links_to_store_site?: StoreSiteLinkEntity[];


  @Column()
  link_to_project_folder: string;

  @Column()
  link_to_presentation?: string;

  @OneToMany(type => LinkCaseEntity, link => link.projects, {cascade: true})
  links_to_case_behance_or_our_site?: LinkCaseEntity[];

  @OneToMany(type => TeamEntity, workerProject => workerProject.projects, {cascade: true})
  teams?: TeamEntity[];

  @OneToMany(type => WorkDirectionEntity, direction => direction.projects, {cascade: true})
  directions_of_work?: WorkDirectionEntity[];

  @OneToMany(type => NominationEntity, nomination => nomination.projects, {cascade: true})
  nominations?: NominationEntity[];

  @Column()
  terms_from?: string;

  @Column()
  terms_to?: string;

  @OneToMany(type => ClockEntity, clock => clock.projects, {cascade: true})
  clock_estimation?: ClockEntity[];
}



@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id_team?: number;

  @Column()
  team_work_direction: string;

  @OneToMany(type => WorkerEntity, worker => worker.team, {cascade: true})
  workers?: WorkerEntity[];

  @ManyToOne(type => ProjectEntity, project => project.teams, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class WorkerEntity {
  @PrimaryGeneratedColumn()
  id_worker: number;

  @Column()
  worker: string;

  @ManyToOne(type => TeamEntity, workerProject => workerProject.workers, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  team?: TeamEntity;
}


@Entity()
export class TechnologyEntity {
  @PrimaryGeneratedColumn()
  id_technology?: number;

  @Column()
  technology: string;

  @ManyToOne(type => ProjectEntity, project => project.technologies, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class StoreSiteLinkEntity {
  @PrimaryGeneratedColumn()
  id_link?: number;

  @Column()
  link: string;

  @ManyToOne(type => ProjectEntity, project => project.links_to_store_site, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class LinkCaseEntity {
  @PrimaryGeneratedColumn()
  id_link_case?: number;

  @Column()
  link_case: string;

  @ManyToOne(type => ProjectEntity, project => project.links_to_case_behance_or_our_site, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class WorkDirectionEntity {
  @PrimaryGeneratedColumn()
  id_work_direction?: number;

  @Column()
  work_direction: string;

  @ManyToOne(type => ProjectEntity, project => project.directions_of_work, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class NominationEntity {
  @PrimaryGeneratedColumn()
  id_nomination?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToOne(type => ProjectEntity, project => project.nominations, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class ClockEntity {
  @PrimaryGeneratedColumn()
  id_clock?: number;

  @Column()
  clock: string;

  @Column()
  direction: string;

  @ManyToOne(type => ProjectEntity, project => project.clock_estimation, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}
