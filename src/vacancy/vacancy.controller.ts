import { Controller, Get, Query } from '@nestjs/common';
import { DeleteVacancyCommand } from './dto/delete-vacancy.command';
import { SaveVacancyCommand } from './dto/save-vacancy.command';
import { UpdateVacancyCommand } from './dto/update-vacancy.command';
import { VacancyService } from './vacancy.service';

@Controller('vacancy')
export class VacancyController {
  constructor(public readonly vacancyService: VacancyService) {}
  @Get('find')
  async find(@Query('title') title?: string) {
    if (title) {
      return await this.vacancyService.find(title);
    }
    return await this.vacancyService.find();
  }

  @Get('update')
  async update(
    @Query('id') id: string,
    @Query('title') title?: string,
    @Query('description') description?: string,
  ) {
    const updateData = new UpdateVacancyCommand(title, description);
    await this.vacancyService.update(id, updateData);
    return true;
  }

  @Get('delete')
  async delete(@Query('id') id: string) {
    const deleteData = new DeleteVacancyCommand(id);
    await this.vacancyService.delete(deleteData);
    return true;
  }

  @Get('store')
  async store(
    @Query('title') title: string,
    @Query('preview') preview: string,
    @Query('description') description: string,
    @Query('city') city: string,
  ) {
    const storeData = new SaveVacancyCommand(title, preview, description, city);
    await this.vacancyService.store(storeData);
  }
}
