import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id_project?: number;

  @Column()
  project_name: string;

  @Column()
  description?: string;

  @Column()
  budget?: number;

  @Column()
  nda: boolean;

  @Column()
  troubles?: string;

  @Column()
  projectLink: string;

  @Column()
  presentationLink?: string;

  @Column()
  timings?: string;

  @Column()
  otrasl: string;

  @Column()
  status: string;

  @Column()
  client: string;

  @OneToMany(type => WorkerProjectEntity, workerProject => workerProject.directionName, {cascade: true})
  workerProjects?: WorkerProjectEntity[];

  @OneToMany(type => TechnologyEntity, technology => technology.technologies, {cascade: true})
  technologies?: TechnologyEntity[];

  @OneToMany(type => StoreSiteLinkEntity, link => link.link, {cascade: true})
  storeSiteLinks?: StoreSiteLinkEntity[];

  @OneToMany(type => LinkCaseEntity, link => link.linkCase, {cascade: true})
  caseBehanceLinks?: LinkCaseEntity[];

  @OneToMany(type => WorkDirectionEntity, direction => direction.workDirection, {cascade: true})
  workDirections?: WorkDirectionEntity[];

  @OneToMany(type => NominationEntity, nomination => nomination.nominationTitle, {cascade: true})
  nominations?: NominationEntity[];

  @OneToMany(type => ClockEntity, clock => clock.clock, {cascade: true})
  workTimes?: ClockEntity[];
}

@Entity()
export class WorkerEntity {
  @PrimaryGeneratedColumn()
  id_worker: number;

  @Column()
  worker: string;

  @OneToMany(type => WorkerProjectEntity, workerProject => workerProject.directionName, {cascade: true})
  workerProjects?: WorkerProjectEntity[];
}

@Entity()
export class WorkerProjectEntity {
  @PrimaryGeneratedColumn()
  id_workerProjectEntity?: number;

  @Column()
  directionName: string;

  @ManyToOne(type => WorkerEntity, worker => worker.workerProjects, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  worker?: WorkerEntity;

  @ManyToOne(type => ProjectEntity, project => project.workerProjects, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projectName?: ProjectEntity;
}

@Entity()
export class TechnologyEntity {
  @PrimaryGeneratedColumn()
  id_technology?: number;

  @Column()
  technologies: string;

  @ManyToOne(type => ProjectEntity, project => project.technologies, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class StoreSiteLinkEntity {
  @PrimaryGeneratedColumn()
  id_link?: number;

  @Column()
  link: string;

  @ManyToOne(type => ProjectEntity, project => project.storeSiteLinks, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class LinkCaseEntity {
  @PrimaryGeneratedColumn()
  id_linkCase?: number;

  @Column()
  linkCase: string;

  @ManyToOne(type => ProjectEntity, project => project.caseBehanceLinks, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class WorkDirectionEntity {
  @PrimaryGeneratedColumn()
  id_workDirection?: number;

  @Column()
  workDirection: string;

  @ManyToOne(type => ProjectEntity, project => project.workDirections, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}

@Entity()
export class NominationEntity {
  @PrimaryGeneratedColumn()
  id_nomination?: number;

  @Column()
  nominationTitle: string;

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

  @ManyToOne(type => ProjectEntity, project => project.workTimes, {onUpdate: "CASCADE", onDelete: "CASCADE"})
  projects?: ProjectEntity;
}
