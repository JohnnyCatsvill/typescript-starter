import { ApiProperty } from '@nestjs/swagger';

export class NominationsDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  link: string;
}

export class ClocksDTO {
  @ApiProperty()
  clock: string;

  @ApiProperty()
  direction: string;
}

export class TeamsDTO {
  @ApiProperty()
  worker: string;
}

export class TeamWorkDirectionsDTO {
  @ApiProperty({type: TeamsDTO, isArray: true})
  workers: TeamsDTO[];

  @ApiProperty()
  team_work_direction: string;
}

export class TechnologiesDTO {
  @ApiProperty()
  technology: string;
}

export class LinksToStoreSiteDTO {
  @ApiProperty()
  link: string;
}

export class LinksToCaseBehanceDTO {
  @ApiProperty()
  link_case: string;
}

export class DirectionsOfWorkDTO {
  @ApiProperty()
  work_direction: string;
}

export class CreateProjectDto {
  @ApiProperty()
  project_name: string;

  @ApiProperty()
  otrasl: string;

  @ApiProperty()
  state_of_project: string;

  @ApiProperty()
  client: string;

  @ApiProperty()
  nda: string;

  @ApiProperty()
  budget: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  problems_and_solvings: string;

  @ApiProperty({type: TechnologiesDTO, isArray: true})
  technologies: TechnologiesDTO[];

  @ApiProperty({type: LinksToStoreSiteDTO, isArray: true})
  links_to_store_site: LinksToStoreSiteDTO[];

  @ApiProperty()
  link_to_project_folder: string;

  @ApiProperty()
  link_to_presentation: string;

  @ApiProperty({type: LinksToCaseBehanceDTO, isArray: true})
  links_to_case_behance_or_our_site: LinksToCaseBehanceDTO[];

  @ApiProperty({type: TeamWorkDirectionsDTO, isArray: true})
  teams: TeamWorkDirectionsDTO[];

  @ApiProperty({type: DirectionsOfWorkDTO, isArray: true})
  directions_of_work: DirectionsOfWorkDTO[];

  @ApiProperty({type: NominationsDTO, isArray: true})
  nominations: NominationsDTO[];

  @ApiProperty()
  terms_from: string;

  @ApiProperty()
  terms_to: string;

  @ApiProperty({type: ClocksDTO, isArray: true})
  clock_estimation: ClocksDTO[];
}

