import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'quiz_questions', schema: "quiz"})
export class QuizQuestionsEntity {
  @PrimaryColumn({
    type: 'uuid'
  })
  id: string;

  @Column({
    type: 'uuid',
    comment: 'id вакансии',
  })
  vacancyId: string;

  @Column({
    type: 'text',
    comment: 'текст вопроса',
  })
  question: string;

  @Column({
    type: 'varchar',
    comment: 'варианты ответов',
    array: true
  })
  answers: string[];

  @Column({
    type: 'varchar',
    comment: 'варианты ответов (верные)',
    array: true
  })
  correctAnswers: string[];
}
