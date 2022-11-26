import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SaveStatisticCommand } from './dto/save-statistics.command';
import { StatisticInfoDto } from './dto/statistic-info-dto';
import { UpdateStatisticCommand } from './dto/update-statistic.command';
import { StatisticEntity } from './entities/statistic.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(StatisticEntity)
    public statisticRepository: Repository<StatisticEntity>,
  ) {}


  async store(data: SaveStatisticCommand) {
    await this.statisticRepository.save(data);
  }
  
  async find(vacancyId?: string) {
    const data = await this.statisticRepository.find({
      where: {vacancyId: vacancyId},
    });
    return data.map((e) => {
      return new StatisticInfoDto(e);
    });
  }

  async update(vacancyId: string, type: UpdateStatisticCommand) {
    const statistic = await this.statisticRepository.findOne({where: {vacancyId: vacancyId}});
    switch(type.type) {
      case 'url': 
          statistic.url += 1;
          await this.statisticRepository.update({ vacancyId: vacancyId }, statistic);
          break
    
      case 'readDescription': 
          statistic.readDescription += 1;
          await this.statisticRepository.update({ vacancyId: vacancyId }, statistic);
          break
    
      case 'quiz':
          statistic.quiz += 1;
          await this.statisticRepository.update({ vacancyId: vacancyId }, statistic);
          break

    }
  }

}
