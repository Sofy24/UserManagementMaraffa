import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true for correct password', async () => {
    // hash of 'password' with 12 rounds
    const hash = '$2b$12$TQsdmNHcNIyX44rM9zrYj.NeZkHjWlfVLLT/boHltshcqL54g7c7W';
    expect(service.compare('password', hash)).toBe(true);
  }, 300_000);

  it('should return false for wrong password', () => {
    const hash = '$2b$12$TQsdmNHcNIyX44rM9zrYj.NeZkHjWlfVLLT/boHltshcqL54g7c7W';
    expect(service.compare('wrongpassword', hash)).toBe(false);
  });
});
