import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByNickname(nickname: string): Promise<User | null>;
  update(nickname: string, updates: Partial<User>): Promise<void>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');
