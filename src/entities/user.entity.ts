import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
