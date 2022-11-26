import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacancy')
export class VacancyEntity {
  @PrimaryGeneratedColumn(
  'uuid',
  )
  id: string;

  @Column({
    type: 'varchar',
    comment: 'Название',
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: 'Описание',
  })
  description: string;

}