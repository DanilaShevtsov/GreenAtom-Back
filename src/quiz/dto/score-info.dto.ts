export class ScoreInfoDto {
  score: number;
  maxScore: number;

  constructor (score: number, maxScore: number) {
    this.score = score;
    this.maxScore = maxScore;
  }
}