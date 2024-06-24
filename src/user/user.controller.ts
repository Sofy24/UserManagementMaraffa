import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserPasswordInterceptor } from 'src/interceptors/user.password.interceptor';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

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
// @UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(UserPasswordInterceptor)
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  // @ApiResponse({ status: 409, description: 'Conflict, user already exixst' })
  // @Override()
  // async createOne(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: User,
  //   @Res() response: Response,
  // ): Promise<any> {
  //   const found = await this.service.findOne({
  //     where: { nickname: dto.nickname },
  //   });
  //   if (found)
  //     return response.status(409).send({ message: 'User already exists' });
  //   await this.service.createOne(req, dto);
  //   return response.status(201).send({ message: 'User created' });
  // }
}
