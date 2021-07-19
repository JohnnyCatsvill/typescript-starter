import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({type: String})
  login: string;

  @ApiProperty({type: String})
  password: string;
}
