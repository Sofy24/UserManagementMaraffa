import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './application/use-cases/auth.service';
import { StatsService } from './application/use-cases/stats.service';
import { TOKEN_SERVICE } from './application/ports/user.port';
import { User } from './domain/entities/user.entity';
import { PasswordService } from './domain/services/password.service';
import { USER_REPOSITORY } from './domain/repositories/user-repository.interface';
import { UserTypeOrmRepository } from './infrastructure/persistence/typeorm/user.typeorm-repository';
import { JwtTokenService } from './infrastructure/jwt/jwt-token.service';
import { LoginController } from './infrastructure/http/controllers/login.controller';
import { StatisticController } from './infrastructure/http/controllers/statistic.controller';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { StatisticService } from './statistic/statistic.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'maraffa-default-secret-change-in-prod',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, LoginController, StatisticController],
  providers: [
    UserService,
    StatisticService,
    PasswordService,
    AuthService,
    StatsService,
    JwtTokenService,
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    UserTypeOrmRepository,
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
  ],
})
export class UserModule {}
