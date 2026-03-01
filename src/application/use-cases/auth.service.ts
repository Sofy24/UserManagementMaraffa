import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordService } from '../../domain/services/password.service';
import { UserService } from '../../user/user.service';
import { IAuthPort, ITokenService, TOKEN_SERVICE } from '../ports/user.port';

@Injectable()
export class AuthService implements IAuthPort {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: ITokenService,
  ) {}

  async login(nickname: string, password: string): Promise<string> {
    const user = await this.userService.findOne({
      where: { nickname },
      select: { nickname: true, password: true },
    });
    if (!user) throw new NotFoundException('Utente non trovato');
    const valid = this.passwordService.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Password errata');
    await this.userService.setActive(nickname, true, new Date());
    return this.tokenService.generateToken({ sub: nickname });
  }

  async logout(nickname: string): Promise<void> {
    const user = await this.userService.findOne({ where: { nickname } });
    if (!user) throw new NotFoundException('Utente non trovato');
    await this.userService.setActive(nickname, false);
  }

  async resetPassword(nickname: string, newPassword: string): Promise<void> {
    const user = await this.userService.findOne({ where: { nickname } });
    if (!user) throw new NotFoundException('Utente non trovato');
    await this.userService.updatePassword(nickname, newPassword);
  }
}
