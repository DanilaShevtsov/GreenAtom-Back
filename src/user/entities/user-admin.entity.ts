import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user_admin', schema: "user"})
export class UsersAdminEntity {
  @PrimaryColumn({
    type: 'uuid',
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
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    comment: "пароль"
  })
  password: string;
}
