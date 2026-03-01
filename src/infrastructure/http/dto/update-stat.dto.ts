import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateUserStatDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsBoolean()
  win: boolean;

  @ApiProperty()
  @IsNumber()
  cricca: number;
}
