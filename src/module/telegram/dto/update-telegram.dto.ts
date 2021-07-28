import { PartialType } from '@nestjs/mapped-types';
import { CreateTelegramDto } from './create-telegram.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTelegramDto extends PartialType(CreateTelegramDto) {

  @ApiProperty({type: Number})
  id: number;
}
