import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { Response } from 'express';
import { StatsService } from '../../../application/use-cases/stats.service';
import { UpdateUserStatDto } from '../dto/update-stat.dto';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statsService: StatsService) {}

  @Post('/bulk')
  @ApiOperation({ summary: 'Updates statistic info of multiple users' })
  @ApiBody({ description: 'Data for updates', type: [UpdateUserStatDto] })
  async updateGameStatisticsBulk(
    @ParsedRequest() req: CrudRequest,
    @Body() body: UpdateUserStatDto[],
    @Res() response: Response,
  ) {
    const notFound = await this.statsService.updateBulk(body);
    if (notFound.length > 0)
      return response.status(404).send({ error: 'Utente non trovato', nicknames: notFound });
    return response.status(200).send({ message: 'User statistics updated' });
  }

  @Post()
  @ApiOperation({ summary: 'Updates statistic info of the users' })
  @ApiBody({ description: 'Data for updates', type: UpdateUserStatDto })
  async updateGameStatistics(
    @ParsedRequest() req: CrudRequest,
    @Body() body: UpdateUserStatDto,
    @Res() response: Response,
  ) {
    const found = await this.statsService.update(body);
    if (!found)
      return response.status(404).send({ error: 'Utente non trovato' });
    return response.status(200).send({ message: 'User statistics updated' });
  }
}
