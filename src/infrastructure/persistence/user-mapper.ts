import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: User): User {
    return raw;
  }

  static toPersistence(user: Partial<User>): Partial<User> {
    return user;
  }
}
