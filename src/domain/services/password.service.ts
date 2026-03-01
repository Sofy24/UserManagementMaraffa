import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  compare(plain: string, hashed: string): boolean {
    return bcrypt.compareSync(plain, hashed);
  }
}
