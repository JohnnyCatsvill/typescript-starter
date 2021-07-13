import { ApiProperty } from "@nestjs/swagger";

export class CreateBriefDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  companyName?: string;

  @ApiProperty()
  companyInfo?: string;

  @ApiProperty()
  isFirstProject: string;

  @ApiProperty()
  personName: string;

  @ApiProperty()
  isWorkedWithOtherAgencies: string;

  @ApiProperty()
  whatPreferredAndNot: string;

  @ApiProperty()
  isOneTimeOrContinuous: string;

  @ApiProperty()
  criteriesOfWorkersChoosing?: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  whoWillTakeDecisions: string;

  @ApiProperty()
  mainFunctionality: string;

  @ApiProperty()
  whatProblemsProductSolves: string;

  @ApiProperty()
  productAuditory: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  isDocumentationAvailable: string;

  @ApiProperty()
  links: string;

  @ApiProperty()
  whatOsSupporting?: string;

  @ApiProperty()
  linksToExistingExamples: string;

  @ApiProperty()
  linkExampleProsAndCons: string;

  @ApiProperty()
  ourProductAdvantages: string;

  @ApiProperty()
  isDesignFromScratch: string;

  @ApiProperty()
  isAppWillRunBackgroundSounds: string;

  @ApiProperty()
  isAppWillMultilingual?: string;

  @ApiProperty()
  isMonetization: string;

  @ApiProperty()
  isServerPartAdminPanel: string;

  @ApiProperty()
  ifIsServerPartAdminIsBackend: string;

  @ApiProperty()
  screenOrientation: string;

  @ApiProperty()
  helpWithPublication: string;

  @ApiProperty()
  developmentStart: string;

  @ApiProperty()
  relizeDate: string;

  @ApiProperty()
  budget: string;

  @ApiProperty()
  other: string;
}
