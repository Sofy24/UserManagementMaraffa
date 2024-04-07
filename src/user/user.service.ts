import { Injectable, UseInterceptors } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CrudRequest } from '@nestjsx/crud';
import { UserPasswordInterceptor } from '../interceptors/user.password.interceptor';
import { UpdateUserStatDto } from '../statistic/dto/update-user-stat.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo);
  }
}
