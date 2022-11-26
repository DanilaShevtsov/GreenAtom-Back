import { Controller, Get, Query } from '@nestjs/common';
import { UpdateStatisticCommand } from './dto/update-statistic.command';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(public readonly statisticService: StatisticService) {}

  @Get('find')
  async find(@Query('vacancyId') vacancyId?: string) {
    return await this.statisticService.find(vacancyId);
  }

  @Get('update')
  async update(
    @Query('vacancyId') vacancyId: string,
    @Query('type') type: string,
  ) {
    const updateData = new UpdateStatisticCommand(vacancyId, type);
    await this.statisticService.update(vacancyId, updateData);
    return true;
  }
}
 