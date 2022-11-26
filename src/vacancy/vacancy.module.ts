import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './entities/vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity])],
  providers: [VacancyService],
  controllers: [VacancyController],
})
export class VacancyModule {}
