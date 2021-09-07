import { ApiProperty } from '@nestjs/swagger';

export class findAllTelegramQuerryDTO {
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