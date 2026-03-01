import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { UpdateUserStatDto } from '../infrastructure/http/dto/update-stat.dto';

@Injectable()
export class StatisticService {
  public updateGameStatistics(user: User, updateBody: UpdateUserStatDto): User {
    if (updateBody.win) user.gamesWon++;
    user.criccaNum += updateBody.cricca;
    user.gamesPlayed++;
    return user;
  }
}
