import { AnswerInfo, SendAnswersCommand } from "./send-answers.command";

export class SaveAnswersCommand {
  userId: string;
  answers: AnswerInfo[];
  score: number;
  scoreMax: number;

  constructor(data: SendAnswersCommand, score: number, scoreMax: number) {
    this.userId = data.userId;
    this.answers = data.data;
    this.score = score;
    this.scoreMax = scoreMax;
  }
}