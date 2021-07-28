import { PartialType } from '@nestjs/mapped-types';
import { CreateBriefDto } from './create-brief.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBriefDto extends PartialType(CreateBriefDto) {

  @ApiProperty()
  id?: number;
}
