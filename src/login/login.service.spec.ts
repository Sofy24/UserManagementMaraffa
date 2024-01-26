import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('LoginService', () => {
  let service: LoginService;
  const user: User = {
    nickname: 'test',
    email: '',
    password: 'pwd',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user ', async () => {
    expect(await service.validateUser('test', 'pwd', user)).toBeDefined();
    expect(await service.validateUser('test', 'pwd', user)).toEqual(user);
    // expect(await service.validateUser('test', 'pwd', user)).toBeInstanceOf(
    //   User,
    // );
  }, 300_000);
});
