import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo);
  }
  // createOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
  //   dto.password = 
  //   return super.createOne(req, dto);
  // }
}
