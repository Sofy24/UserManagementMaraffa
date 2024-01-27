import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController, CrudRequest } from '@nestjsx/crud';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserPasswordInterceptor } from 'src/interceptors/user.password.interceptor';

@Crud({
  model: {
    type: User,
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(UserPasswordInterceptor)
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
