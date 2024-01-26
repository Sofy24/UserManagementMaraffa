import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async login() {
    const user = await this.userService.findOne({
      where: { nickname: 'string' },
    });
    return this.loginService.validateUser('string', 'string', user);
  }
}
