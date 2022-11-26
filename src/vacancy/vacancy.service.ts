import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteVacancyCommand } from './dto/delete-vacancy.command';
import { SaveVacancyCommand } from './dto/save-vacancy.command';
import { VacancyInfoDto } from './dto/vacancy-info.dto';
import { UpdateVacancyCommand } from './dto/update-vacancy.command';
import { VacancyEntity } from './entities/vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyEntity)
    public vacancyRepository: Repository<VacancyEntity>,
  ) {}

  async store(data: SaveVacancyCommand) {
    await this.vacancyRepository.save(data);
  }

  async update(id: string, data: UpdateVacancyCommand) {
    await this.vacancyRepository.update({ id: id }, data);
  }

  async delete(data: DeleteVacancyCommand) {
    await this.vacancyRepository.delete(data.id);
  }

  async find(title?: string) {
    let optionsWhere;
    if (title) {
      optionsWhere = { title: ILike(`%${title}%`) };
    }
    const data = await this.vacancyRepository.find({
      where: optionsWhere,
    });
    console.log(data)
    return data.map((e) => {
      return new VacancyInfoDto(e);
    });
  }
}
