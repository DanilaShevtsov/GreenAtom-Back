import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'user_admin', schema: "user"})
export class UsersAdminEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: randomUUID(),
  })
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
    comment: "пароль"
  })
  password: string;
}
