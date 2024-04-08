import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UpdateUserStatDto } from './dto/update-user-stat.dto';

@Injectable()
export class StatisticService {
  public updateGameStatistics(user: User, updateBody: UpdateUserStatDto): User {
    if (updateBody.win) user.gamesWon++;
    user.criccaNum += updateBody.cricca;
    user.gamesPlayed++;
    return user;
  }
}
