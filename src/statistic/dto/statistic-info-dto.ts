import { StatisticEntity } from '../entities/statistic.entity';

export class StatisticInfoDto {
  vacancyId: string;
  url: number;
  readDescription: number;
  quiz: number;


  constructor(data: StatisticEntity) {
    this.vacancyId = data.vacancyId;
    this.url = data.url;
    this.readDescription = data.readDescription;
    this.quiz = data.quiz;
  }
}
