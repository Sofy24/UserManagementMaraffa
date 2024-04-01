import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import * as bcrypt from 'bcrypt';

const saltRounds = 12;

@Injectable()
export class UserPasswordInterceptor implements NestInterceptor {
  async hashPassword(password: string): Promise<any> {
    const salt = await bcrypt.genSalt(saltRounds);
    return { password: await bcrypt.hash(password, salt), salt };
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    // Insert of one or more users
    if (
      context.switchToHttp().getRequest().method != 'GET' &&
      context.switchToHttp().getRequest().method != 'DELETE'
    ) {
      const body = context.switchToHttp().getRequest().body;
      // bulk operation
      if (Array.isArray(context.switchToHttp().getRequest().body)) {
        context.switchToHttp().getRequest().body = await Promise.all(
          body.map(async (user) => ({
            ...user,
            ...(await this.hashPassword(user.password)),
          })),
        );
      } else {
        // single operation
        context.switchToHttp().getRequest().body = {
          ...body,
          ...(await this.hashPassword(body.password)),
        };
      }
      return next.handle().pipe();
    }
  }
}
