import {
  ClassSerializerInterceptor,
  Controller,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserPasswordInterceptor } from 'src/interceptors/user.password.interceptor';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

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
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(UserPasswordInterceptor)
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @ApiResponse({ status: 409, description: 'Conflict, user already exixst' })
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
    @Res() response: Response,
  ): Promise<User> {
    const found = await this.service.findOne({
      where: { nickname: dto.nickname },
    });
    if (found) response.status(409).send({ message: 'User already exists' });
    return this.service.createOne(req, dto);
  }
}
