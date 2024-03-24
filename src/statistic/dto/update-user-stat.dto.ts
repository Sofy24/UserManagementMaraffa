import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  win: boolean;
  @ApiProperty()
  cricca: number;
}
