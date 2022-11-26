import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AnswerInfo } from '../dto/command/send-answers.command';

@Entity({name: 'quiz_answers', schema: "quiz"})
export class QuizAnswersEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  userId: string;

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
