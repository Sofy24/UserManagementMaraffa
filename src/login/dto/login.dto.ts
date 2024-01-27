import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
}
