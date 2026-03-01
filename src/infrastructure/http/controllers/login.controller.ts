import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../../../application/use-cases/auth.service';
import { LoginDto } from '../dto/login.dto';
import { UserPasswordInterceptor } from '../interceptors/user-password.interceptor';

@ApiTags('Login')
@Controller('')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(UserPasswordInterceptor)
  @Post('reset-password')
  @ApiOperation({ summary: 'Resets user password' })
  @ApiBody({ description: 'Data for resetting user password', type: LoginDto })
  @ApiResponse({ status: 200, description: 'Reset successfull' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async resetPassword(@Body() body: LoginDto, @Res() res: Response) {
    try {
      await this.authService.resetPassword(body.nickname, body.password);
      return res.status(200).send({ message: 'ok' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ error: error.message });
      }
      return res.status(500).send({ message: `Internal server: ${error}` });
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logs out user' })
  @ApiBody({ description: 'User nickname', type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logout successfull' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async logOut(@Body() body: LoginDto, @Res() res: Response) {
    try {
      await this.authService.logout(body.nickname);
      return res.status(200).send({ message: 'ok' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ error: error.message });
      }
      return res.status(500).send({ message: `Internal server: ${error}` });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Does the authentication' })
  @ApiBody({ description: 'Data for autentication', type: LoginDto })
  @ApiResponse({ status: 200, description: 'Authentication successfull' })
  @ApiResponse({ status: 401, description: 'Credentials are incorrect' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const token = await this.authService.login(body.nickname, body.password);
      return res.status(200).send({ token });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ error: error.message });
      }
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ error: error.message });
      }
      return res.status(500).send({ message: `Internal server: ${error}` });
    }
  }
}
