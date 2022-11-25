import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SaveUserInfoCommand } from './dto/command/save-user-info.command';
import { UsersAdminEntity } from './entities/user-admin.entity';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UsersAdminEntity)
    public usersAdminRepository: Repository<UsersAdminEntity>,
    public jwtService: JwtService,
  ) {}

  async validate(login: string, password: string) {
    const user = await this.usersAdminRepository.findOne({where: {email: login}});
    if (user.password === password) {
      const {password, ...result} = user;
      return result
    }
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, fio: user.fio, };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async jwtValidate(token: string) {
    const user = this.jwtService.verify(token);
    console.log(user)
  }
}
