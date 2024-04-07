import { Test, TestingModule } from '@nestjs/testing';
import { StatisticService } from './statistic.service';
import { User } from '../entities/user.entity';
import { UpdateUserStatDto } from './dto/update-user-stat.dto';

describe('StatisticService', () => {
  let service: StatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticService],
    }).compile();

    service = module.get<StatisticService>(StatisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateGameStatistics', () => {
    it('should update user game statistics correctly', () => {
      const user = new User();
      user.gamesWon = 5;
      user.criccaNum = 10;
      user.gamesPlayed = 20;

      const updateBody: UpdateUserStatDto = {
        nickname: 'test',
        win: true,
        cricca: 2,
      };

      const updatedUser = service.updateGameStatistics(user, updateBody);

      expect(updatedUser.gamesWon).toEqual(6); // gamesWon should be incremented by 1
      expect(updatedUser.criccaNum).toEqual(12); // criccaNum should be incremented by 2
      expect(updatedUser.gamesPlayed).toEqual(21); // gamesPlayed should be incremented by 1
    });

    it('should not update gamesWon if updateBody.win is false', () => {
      const user = new User();
      user.gamesWon = 5;

      const updateBody: UpdateUserStatDto = {
        nickname: 'test',
        win: false,
        cricca: 2,
      };

      const updatedUser = service.updateGameStatistics(user, updateBody);

      expect(updatedUser.gamesWon).toEqual(5); // gamesWon should remain unchanged
    });
  });
});
