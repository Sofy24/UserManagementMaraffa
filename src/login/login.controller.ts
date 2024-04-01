import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) {}

  @Post()
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
    const authenticated = await this.loginService.validateUser(
      body.password,
      user,
    );
    if (!authenticated) return res.status(401).send({ message: 'ko' });

    await this.userService.repo.update(
      {
        nickname: user.nickname,
      },
      {
        latestLogin: new Date(),
      },
    );
    return res.status(200).send({ message: 'ok' });
  }
}
