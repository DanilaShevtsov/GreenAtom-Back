import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticModule } from 'src/statistic/statistic.module';
import { EmailSenderService } from './email-sender.service';


@Module({
  imports: [],
  providers: [EmailSenderService],
  controllers: [],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
