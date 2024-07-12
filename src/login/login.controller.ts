import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserPasswordInterceptor } from 'src/interceptors/user.password.interceptor';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(UserPasswordInterceptor)
  @Post('reset-password')
  @ApiOperation({ summary: 'Resets user password' })
  @ApiBody({
    description: 'Data for resetting user password',
    type: LoginDto, // Sostituisci con il DTO effettivo per l'autenticazione
  })
  @ApiResponse({ status: 200, description: 'Reset successfull' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async resetPassword(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { nickname: body.nickname },
      select: { nickname: true, password: true },
    });
    if (!user) return res.status(404).send({ message: 'User not found' });
    try {
      await this.userService.repo.update(
        { nickname: user.nickname },
        { password: body.password },
      );
      await this.userService.repo.update(
        {
          nickname: user.nickname,
        },
        {
          latestLogin: new Date(),
        },
      );
      return res.status(200).send({ message: 'ok' });
    } catch (error) {
      return res.status(500).send({ message: `Internal server: ${error}` });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Does the authentication' })
  @ApiBody({
    description: 'Data for autentication',
    type: LoginDto, // Sostituisci con il DTO effettivo per l'autenticazione
  })
  @ApiResponse({ status: 200, description: 'Authentication successfull' })
  @ApiResponse({ status: 401, description: 'Credentials are incorrect' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { nickname: body.nickname },
      select: { nickname: true, password: true },
    });
    if (!user) return res.status(404).send({ message: 'User not found' });
    try {
      const authenticated = await this.loginService.validateUser(
        body.password,
        user,
      );
      if (!authenticated)
        return res.status(401).send({ message: 'ko, password was wrong' });

      await this.userService.repo.update(
        {
          nickname: user.nickname,
        },
        {
          latestLogin: new Date(),
        },
      );
      return res.status(200).send({ message: 'ok' });
    } catch (error) {
      return res.status(500).send({ message: `Internal server: ${error}` });
    }
  }
}
