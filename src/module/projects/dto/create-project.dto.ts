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
  team: string[];

  @ApiProperty()
  team_work_direction: string;
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

  @ApiProperty()
  technologies: string[];

  @ApiProperty()
  links_to_store_site: string[];

  @ApiProperty()
  link_to_project_folder: string;

  @ApiProperty()
  link_to_presentation: string;

  @ApiProperty()
  links_to_case_behance_or_our_site: string[];

  @ApiProperty({type: TeamsDTO, isArray: true})
  teams: TeamsDTO[];

  @ApiProperty()
  directions_of_work: string[];

  @ApiProperty({type: NominationsDTO, isArray: true})
  nominations: NominationsDTO[];

  @ApiProperty()
  terms_from: string;

  @ApiProperty()
  terms_to: string;

  @ApiProperty({type: ClocksDTO, isArray: true})
  clock_estimation: ClocksDTO[];
}

