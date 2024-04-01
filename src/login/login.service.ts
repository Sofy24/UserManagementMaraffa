import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  private checkPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
  async validateUser(password: string, user: Partial<User>): Promise<any> {
    if (user && user.password) {
      return this.checkPassword(password, user.password);
    }
    throw new Error('User is not defined');
  }
}
