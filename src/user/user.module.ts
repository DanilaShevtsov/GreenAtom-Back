import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInfoEntity } from './entities/user-info.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersInfoEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
