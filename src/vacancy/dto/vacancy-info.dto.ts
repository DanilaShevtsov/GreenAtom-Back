import { VacancyEntity } from '../entities/vacancy.entity';

export class VacancyInfoDto {
  title: string;
  description: string;

  constructor(data: VacancyEntity) {
    this.title = data.title;
    this.description = data.description;
  }
}
