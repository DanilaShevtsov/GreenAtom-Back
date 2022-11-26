import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statistic', schema: 'statistic'})
export class StatisticEntity {
  @PrimaryColumn({
  type: 'varchar',
  comment: 'ID Вакансии',
  })
  vacancyId: string;

  @Column({
    type: 'int4',
    comment: 'Переход по ссылке',
  })
  url: number;

  @Column({
    type: 'int4',
    comment: 'Чтение описания',
  })
  readDescription: number;

  @Column({
    type: 'int4',
    comment: 'прохождение опроса',
  })
  quiz: number;

}
