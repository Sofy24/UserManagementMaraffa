import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { formatDate } from '../interceptors/date-transformer';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  @PrimaryColumn({ unique: true })
  @ApiProperty()
  nickname: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  email?: string;

  @Column({ default: true })
  @ApiProperty()
  isActive?: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Transform(formatDate, { toPlainOnly: true })
  @ApiProperty()
  registrationDate?: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Transform(formatDate, { toPlainOnly: true })
  @ApiProperty()
  latestLogin?: Date;

  @Column({ default: 0 })
  @ApiProperty({ default: 0 })
  gamesPlayed?: number;

  @Column({ default: 0 })
  @ApiProperty({ default: 0 })
  gamesWon?: number;

  @Column({ default: 0 })
  @ApiProperty({ default: 0 })
  criccaNum?: number;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  salt?: string;
}
