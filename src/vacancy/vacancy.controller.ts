import { Body, Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt.guard';
import { DeleteVacancyCommand } from './dto/delete-vacancy.command';
import { SaveVacancyCommand } from './dto/save-vacancy.command';
import { UpdateVacancyCommand } from './dto/update-vacancy.command';
import { VacancyService } from './vacancy.service';

@Controller('vacancy')
export class VacancyController {
  constructor(public readonly vacancyService: VacancyService) {}
  @Get('find')
  async find(@Query('id') id?: string) {
    return await this.vacancyService.find(id);
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

  @UseGuards(JwtAuthGuard)
  @Post('store')
  async store(
    @Body() query: SaveVacancyCommand,
    @Request() req,
  ) {
    await this.vacancyService.store(query, req.user.id);
  }
}
