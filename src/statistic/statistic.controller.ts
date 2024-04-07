import { Body, Controller, Post, Res } from '@nestjs/common';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { User } from 'src/entities/user.entity';
import { UpdateUserStatDto } from './dto/update-user-stat.dto';
import { Response } from 'express';
import { StatisticService } from './statistic.service';
import { UserService } from 'src/user/user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(
    private readonly statisticService: StatisticService,
    private readonly userService: UserService,
  ) {}

  @Post('/bulk')
  @ApiOperation({ summary: 'Updates statistic info of multiple users' })
  @ApiBody({
    description: 'Data for updates',
    type: [UpdateUserStatDto], // Sostituisci con il DTO effettivo per l'autenticazione
  })
  async updateGameStatisticsBulk(
    @ParsedRequest() req: CrudRequest,
    @Body() body: UpdateUserStatDto[],
    @Res() response: Response,
  ) {
    for (const player of body) {
      const user: User = await this.userService.findOne({
        where: { nickname: player.nickname },
      });
      if (!user) response.status(404).send({ message: "User doesn't exists" });
      try {
        const updatedUser: User = this.statisticService.updateGameStatistics(
          user,
          player,
        );
        await this.userService.repo.update(
          {
            nickname: user.nickname,
          },
          updatedUser,
        );
      } catch (error) {
        response.status(500).send({ message: `Internal server: ${error}` });
      }
    }
    return response.status(200).send({ message: 'User statistics updated' });
  }

  @Post()
  @ApiOperation({ summary: 'Updates statistic info of the users' })
  @ApiBody({
    description: 'Data for updates',
    type: UpdateUserStatDto, // Sostituisci con il DTO effettivo per l'autenticazione
  })
  async updateGameStatistics(
    @ParsedRequest() req: CrudRequest,
    @Body() body: UpdateUserStatDto,
    @Res() response: Response,
  ) {
    const user: User = await this.userService.findOne({
      where: { nickname: body.nickname },
    });
    if (!user) response.status(404).send({ message: "User doesn't exists" });
    try {
      const updatedUser: User = this.statisticService.updateGameStatistics(
        user,
        body,
      );
      await this.userService.repo.update(
        {
          nickname: user.nickname,
        },
        updatedUser,
      );
      return response.status(200).send({ message: 'User statistics updated' });
    } catch (error) {
      response.status(500).send({ message: `Internal server: ${error}` });
    }
  }
}
