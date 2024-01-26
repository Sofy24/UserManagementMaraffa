import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @Column()
  @ApiProperty()
  nickname: string;

  @Column()
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

  @Column()
  @ApiProperty({ default: 0 })
  gamesPlayed?: number;

  @Column()
  @ApiProperty({ default: 0 })
  gamesWon?: number;

  @Column()
  @ApiProperty({ default: 0 })
  criccaNum?: number;
}
