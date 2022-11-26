import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerInfo } from '../dto/command/send-answers.command';

@Entity({name: 'quiz_answers', schema: "quiz"})
export class QuizAnswersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: false })
  userId: string;

  @Column({ type: 'varchar' })
  vacancyId: string;

  @Column({
    type: 'jsonb',
    comment: 'id вакансии',
  })
  answers: AnswerInfo[];

  @Column({
    type: 'int4',
    comment: 'количество набранных баллов',
  })
  score: number;

  @Column({
    type: 'int4',
    comment: 'максимальное количество баллов',
  })
  scoreMax: number;
}
