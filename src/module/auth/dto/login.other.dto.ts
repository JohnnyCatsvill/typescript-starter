import { ApiProperty } from '@nestjs/swagger';

export class LoginOtherDto {
  @ApiProperty({type: Number})
  id: number;

  @ApiProperty({type: String})
  login: string;

  @ApiProperty({type: String})
  password: string;
}
