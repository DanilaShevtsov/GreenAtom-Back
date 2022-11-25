import { VacancyEntity } from '../entities/vacancy.entity';

export class VacancyInfoDto {
  id: string;
  title: string;
  preview: string;
  description: string;
  city: string;

  constructor(data: VacancyEntity) {
    this.id = data.id;
    this.title = data.title;
    this.preview = data.preview;
    this.description = data.description;
    this.city = data.city;
  }
}
