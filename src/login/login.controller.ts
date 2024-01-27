import { Body, Controller, Get, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async login(@Body() body: any, @Res() res: Response) {
    console.log(body);
    const user = await this.userService.findOne({
      where: { nickname: body.nickname },
      select: { nickname: true, password: true },
    });
    res
      .status((await this.loginService.validateUser(body, user)) ? 200 : 401)
      .send();
  }
}
