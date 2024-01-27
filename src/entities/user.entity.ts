import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
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
  @ApiProperty()
  registrationDate?: Date;


  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  latestLogin?: Date;

  @Column()
  @ApiProperty({ default: 0 })
  gamesPlayed?: number;

  @Column()
  @ApiProperty({ default: 0 })
  gamesWon?: number;

  @Column()
  @ApiProperty({ default: 0 })
  criccaNum?: number;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  salt?: string;
}
