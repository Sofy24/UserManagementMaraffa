import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '../../../domain/entities/user.entity';
import { UserService } from '../../../user/user.service';
import { UserPasswordInterceptor } from '../interceptors/user-password.interceptor';

@Crud({
  model: {
    type: User,
  },
  params: {
    nickname: {
      field: 'nickname',
      type: 'string',
      primary: true,
    },
  },
})
@UseInterceptors(UserPasswordInterceptor)
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
