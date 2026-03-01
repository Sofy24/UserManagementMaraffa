import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

const saltRounds = 12;

@Injectable()
export class UserPasswordInterceptor implements NestInterceptor {
  async hashPassword(password: string): Promise<any> {
    const salt = await bcrypt.genSalt(saltRounds);
    return { password: await bcrypt.hash(password, salt) };
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    if (
      context.switchToHttp().getRequest().method != 'GET' &&
      context.switchToHttp().getRequest().method != 'DELETE'
    ) {
      const body = context.switchToHttp().getRequest().body;
      if (Array.isArray(body)) {
        context.switchToHttp().getRequest().body = await Promise.all(
          body.map(async (user) => ({
            ...user,
            ...(await this.hashPassword(user.password)),
          })),
        );
      } else {
        context.switchToHttp().getRequest().body = {
          ...body,
          ...(await this.hashPassword(body.password)),
        };
      }
    }
    return next.handle().pipe();
  }
}
