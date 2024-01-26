import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LoginService {
  async validateUser(
    nickname: string,
    password: string,
    user: User,
  ): Promise<any> {
    if (user && user.password === password) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }
}
