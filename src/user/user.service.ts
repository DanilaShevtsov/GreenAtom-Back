import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SaveUserInfoCommand } from './dto/command/save-user-info.command';
import { UsersInfoEntity } from './entities/user-info.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersInfoEntity)
    public usersInfoRepository: Repository<UsersInfoEntity>,
  ) {}

  async store(data: SaveUserInfoCommand) {
    data.id = uuid();
    return (await this.usersInfoRepository.save(data)).id;
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
