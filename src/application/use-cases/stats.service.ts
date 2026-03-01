import { Injectable } from '@nestjs/common';
import { UpdateUserStatDto } from '../../infrastructure/http/dto/update-stat.dto';
import { StatisticService } from '../../statistic/statistic.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly userService: UserService,
    private readonly statisticService: StatisticService,
  ) {}

  async update(dto: UpdateUserStatDto): Promise<boolean> {
    const user = await this.userService.findOne({
      where: { nickname: dto.nickname },
    });
    if (!user) return false;
    const updated = this.statisticService.updateGameStatistics(user, dto);
    await this.userService.updateStats(dto.nickname, updated);
    return true;
  }

  async updateBulk(dtos: UpdateUserStatDto[]): Promise<string[]> {
    const notFound: string[] = [];
    for (const dto of dtos) {
      const found = await this.update(dto);
      if (!found) notFound.push(dto.nickname);
    }
    return notFound;
  }
}
