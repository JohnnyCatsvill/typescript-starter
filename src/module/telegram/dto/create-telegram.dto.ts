import { ApiProperty } from '@nestjs/swagger';

export class CreateTelegramDto {
  @ApiProperty({type: String})
  title: string;

  @ApiProperty({type: String})
  description: string;
}
