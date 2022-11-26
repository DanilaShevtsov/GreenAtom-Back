import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Raw, Repository } from 'typeorm';
import { SaveUserInfoCommand } from './dto/command/save-user-info.command';
import { UsersInfoEntity } from './entities/user-info.entity';
import { v4 as uuid } from 'uuid';
import { raw } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersInfoEntity)
    public usersInfoRepository: Repository<UsersInfoEntity>,
  ) {}

  async store(data: SaveUserInfoCommand) {
    if(!await this.validateEmail(data.email)) {
      throw new BadRequestException("Пользователь с таким email уже зарегистрирован")
    }
    data.id = uuid();
    return (await this.usersInfoRepository.save(data)).id;
  }

  async validateEmail(email: string) {
    const rows = await this.usersInfoRepository.findBy({ email: Raw((alias) => `LOWER(${alias}) = :email`, {email: email.toLowerCase()})})
    return !(rows.length > 0);
  }

  /* async update(id: string, data: UpdateStudentCommand) {
    await this.studentsRepository.update({ id: id }, data);
  } */

  /* async delete(data: DeleteStudentCommand) {
    await this.studentsRepository.delete(data.id);
  } */

  /* async find(name?: string) {
    let optionsWhere;
    if (name) {
      optionsWhere = { name: ILike(`%${name}%`) };
    }
    const data = await this.studentsRepository.find({
      where: optionsWhere,
    });
    console.log(data)
    return data.map((e) => {
      return new StudentsInfoDto(e);
    });
  } */
}
