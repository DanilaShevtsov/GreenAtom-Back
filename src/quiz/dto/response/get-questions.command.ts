import { QuizQuestionsEntity } from "../../entities/quiz-questions.entity";

export class GetQuestionCommand {
  id: string;
  vacancyId: string;
  question: string;
  answers: string[];
  correctAnswers: string[];

  constructor(data: QuizQuestionsEntity) {
    this.id = data.id;
    this.vacancyId = data.vacancyId;
    this.question = data.question;
    this.answers = data.answers;
  }
}