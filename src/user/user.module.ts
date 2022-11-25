import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersAdminEntity } from './entities/user-admin.entity';
import { UsersInfoEntity } from './entities/user-info.entity';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserAdminController } from './user-admin.controller';
import { UserAdminService } from './user-admin.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
require('dotenv').config();

@Module({
  imports: [
      TypeOrmModule.forFeature([UsersInfoEntity, UsersAdminEntity]), 
      PassportModule, 
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '10m' },
      }),
  ],
  controllers: [UserController, UserAdminController],
  providers: [UserService, LocalStrategy, UserAdminService, JwtStrategy],
})
export class UserModule {}
