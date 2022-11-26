import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user_info', schema: "user"})
export class UsersInfoEntity {
  @PrimaryGeneratedColumn(
    'uuid',
  )
  id: string;

  @Column({
    type: 'varchar',
    comment: 'ФИО',
  })
  fio: string;

  @Column({
    type: "varchar",
    comment: "email",
  })
  email: string;

  @Column({
    type: "varchar",
    comment: "номер телефона"
  })
  phone: string;
}
