import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QRCodeModule } from './qrcode/qrcode.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
        '.env.production',
        '.env.development.local',
        '.env.development',
      ],
    }),
    TypeOrmModule.forRoot({
      retryAttempts: 1000,
      autoLoadEntities: true,
      type: 'postgres',
      url: process.env.POSTGRES,
      migrations: ['dist/src/migration/**/*.ts'],
      entities: ['dist/src/**/entities/**.entity.ts'],
      migrationsRun: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    VacancyModule,
    QuizModule,
    QRCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
