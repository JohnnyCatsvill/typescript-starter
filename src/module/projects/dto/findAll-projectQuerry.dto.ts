import { ApiProperty } from '@nestjs/swagger';

export class findAllProjectQuerryDTO {
  @ApiProperty()
  sort?: string;

  @ApiProperty()
  order?: "ASC"|"DESC";

  @ApiProperty()
  page?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  filter?: string;
}