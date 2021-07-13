import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class BriefEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  companyName?: string;

  @Column()
  companyInfo?: string;

  @Column()
  isFirstProject: string;

  @Column()
  personName: string;

  @Column()
  isWorkedWithOtherAgencies: string;

  @Column()
  whatPreferredAndNot: string;

  @Column()
  isOneTimeOrContinuous: string;

  @Column()
  criteriesOfWorkersChoosing?: string;

  @Column()
  contactPerson: string;

  @Column()
  whoWillTakeDecisions: string;

  @Column()
  mainFunctionality: string;

  @Column()
  whatProblemsProductSolves: string;

  @Column()
  productAuditory: string;

  @Column()
  platform: string;

  @Column()
  isDocumentationAvailable: string;

  @Column()
  links: string;

  @Column()
  whatOsSupporting?: string;

  @Column()
  linksToExistingExamples: string;

  @Column()
  linkExampleProsAndCons: string;

  @Column()
  ourProductAdvantages: string;

  @Column()
  isDesignFromScratch: string;

  @Column()
  isAppWillRunBackgroundSounds: string;

  @Column()
  isAppWillMultilingual?: string;

  @Column()
  isMonetization: string;

  @Column()
  isServerPartAdminPanel: string;

  @Column()
  ifIsServerPartAdminIsBackend: string;

  @Column()
  screenOrientation: string;

  @Column()
  helpWithPublication: string;

  @Column()
  developmentStart: string;

  @Column()
  relizeDate: string;

  @Column()
  budget: string;

  @Column()
  other: string;
}