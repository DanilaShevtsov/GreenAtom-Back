import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacancy')
export class VacancyEntity {
  @PrimaryColumn(
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
    comment: 'Краткое описание',    
  })
  preview: string;

  @Column({
    type: 'varchar',
    comment: 'Описание',
  })
  description: string;

  @Column({
    type: 'varchar',
    comment: 'Город',
  })
  city: string;

}
