export class AnswerInfo {
  questionId: string;
  answer: string;

  constructor(questionId: string, answer: string) {
    this.questionId = questionId;
    this.answer;
  }
}

export class SendAnswersCommand {
  userId: string;
  data: AnswerInfo[];
}