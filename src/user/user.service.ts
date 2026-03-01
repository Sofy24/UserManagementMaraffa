import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo);
  }

  async setActive(
    nickname: string,
    isActive: boolean,
    loginDate?: Date,
  ): Promise<void> {
    await this.repo.update(
      { nickname },
      { isActive, ...(loginDate && { latestLogin: loginDate }) },
    );
  }

  async updatePassword(nickname: string, password: string): Promise<void> {
    await this.repo.update({ nickname }, { password, latestLogin: new Date() });
  }

  async updateStats(nickname: string, updates: Partial<User>): Promise<void> {
    await this.repo.update({ nickname }, updates);
  }
}
