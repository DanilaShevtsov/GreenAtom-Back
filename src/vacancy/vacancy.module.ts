import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticModule } from 'src/statistic/statistic.module';
import { StatisticService } from 'src/statistic/statistic.service';
import { UserModule } from 'src/user/user.module';
import { VacancyEntity } from './entities/vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';


@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity]), UserModule, StatisticModule],
  providers: [VacancyService],
  controllers: [VacancyController],
})
export class VacancyModule {}
