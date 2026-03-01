import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async findByNickname(nickname: string): Promise<User | null> {
    return this.repo.findOne({ where: { nickname } });
  }

  async update(nickname: string, updates: Partial<User>): Promise<void> {
    await this.repo.update({ nickname }, updates);
  }
}
