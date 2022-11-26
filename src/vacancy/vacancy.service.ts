import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteVacancyCommand } from './dto/delete-vacancy.command';
import { SaveVacancyCommand } from './dto/save-vacancy.command';
import { VacancyInfoDto } from './dto/vacancy-info.dto';
import { UpdateVacancyCommand } from './dto/update-vacancy.command';
import { VacancyEntity } from './entities/vacancy.entity';
import { v4 as uuid } from 'uuid';
import { StatisticService } from 'src/statistic/statistic.service';
import { SaveStatisticCommand } from 'src/statistic/dto/save-statistics.command';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyEntity)
    public vacancyRepository: Repository<VacancyEntity>,
    public statisticService: StatisticService,
  ) {}

  async store(data: SaveVacancyCommand, hrId: string) {
    data.id = uuid()
    data.hrId = hrId;
    await this.vacancyRepository.save(data);
    const saveCommand = new SaveStatisticCommand(0,0,0);
    saveCommand.vacancyId = data.id;
    await this.statisticService.store(saveCommand);
  }

  async update(id: string, data: UpdateVacancyCommand) {
    await this.vacancyRepository.update({ id: id }, data);
  }

  async delete(data: DeleteVacancyCommand) {
    await this.vacancyRepository.delete(data.id);
  }

  async find(id?: string) {
    const data = await this.vacancyRepository.find({
      relations: ['hr'],
      where: {id: id},
    });
    return data.map((e) => {
      return new VacancyInfoDto(e);
    });
  }

  async findWithoutParse(id?: string) {
    return await this.vacancyRepository.find({
      relations: ['hr'],
      where: {id: id},
    });
  }
}
