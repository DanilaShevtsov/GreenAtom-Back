import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { StatisticEntity } from './entities/statistic.entity';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticEntity]), UserModule],
  providers: [StatisticService],
  controllers: [StatisticController],
  exports: [StatisticService]
})
export class StatisticModule {}
