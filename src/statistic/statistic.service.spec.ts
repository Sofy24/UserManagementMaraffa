import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../domain/entities/user.entity';
import { UpdateUserStatDto } from '../infrastructure/http/dto/update-stat.dto';
import { StatisticService } from './statistic.service';

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

      expect(updatedUser.gamesWon).toEqual(6);
      expect(updatedUser.criccaNum).toEqual(12);
      expect(updatedUser.gamesPlayed).toEqual(21);
    });

    it('should not update gamesWon if win is false', () => {
      const user = new User();
      user.gamesWon = 5;

      const updateBody: UpdateUserStatDto = {
        nickname: 'test',
        win: false,
        cricca: 2,
      };

      const updatedUser = service.updateGameStatistics(user, updateBody);

      expect(updatedUser.gamesWon).toEqual(5);
    });
  });
});
