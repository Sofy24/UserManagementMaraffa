import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('LoginService', () => {
  let service: LoginService;
  const user: User = {
    nickname: 'asd',
    email: '',
    password: '$2b$12$TQsdmNHcNIyX44rM9zrYj.NeZkHjWlfVLLT/boHltshcqL54g7c7W',
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
    expect(await service.validateUser('password', user)).toBe(true);
  }, 300_000);
});
