import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/user/jwt.guard";
import { SendAnswersCommand } from "./dto/command/send-answers.command";
import { StoreQuestionCommand } from "./dto/command/store-question.command";
import { QuizQuestionService } from "./quiz.service";

@Controller('quiz')
export class QuizQuestionController {
  constructor(public readonly quizQuestionService: QuizQuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-question')
  async createQuestions(@Body() query: StoreQuestionCommand) {
    return await this.quizQuestionService.store(query);
  }

  @Get('get-questions')
  async getQuestions(@Query('vacancyId') vacancyId?: string) {
    return await this.quizQuestionService.find(vacancyId);
  }

  @Post('send-answers')
  async sendAnswers(@Body() query: SendAnswersCommand) {
    return await this.quizQuestionService.storeAnswers(query);
  }
}