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

export class WorkersProjectsDTO {
  @ApiProperty()
  workers: string[];

  @ApiProperty()
  direction: string;
}

export class CreateProjectDto {
  @ApiProperty()
  projectName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  budget: number;

  @ApiProperty()
  nda: boolean;

  @ApiProperty()
  troubles: string;

  @ApiProperty()
  projectLink: string;

  @ApiProperty()
  presentationLink: string;

  @ApiProperty()
  timings: string;

  @ApiProperty()
  otrasl: string;

  @ApiProperty()
  client: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  directions: string[];

  @ApiProperty()
  technologies: string[];

  @ApiProperty()
  storeSiteLinks: string[];

  @ApiProperty()
  caseBehanceLinks: string[];

  @ApiProperty()
  workDirections: string[];

  @ApiProperty({type: NominationsDTO, isArray: true})
  nominations: NominationsDTO[];

  @ApiProperty({type: ClocksDTO, isArray: true})
  clocks: ClocksDTO[];

  @ApiProperty({type: WorkersProjectsDTO, isArray: true})
  workerProjects: WorkersProjectsDTO[];
}

