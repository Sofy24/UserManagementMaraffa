import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
