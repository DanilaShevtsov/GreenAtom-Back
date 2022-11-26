import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { QuizQuestionsEntity } from './entities/quiz-questions.entity';
import { StoreQuestionCommand } from './dto/command/store-question.command';
import { VacancyService } from 'src/vacancy/vacancy.service';
import { GetQuestionCommand } from './dto/response/get-questions.command';
import { SendAnswersCommand } from './dto/command/send-answers.command';
import { QuizAnswersEntity } from './entities/quiz-answers.entity';
import { SaveAnswersCommand } from './dto/command/save-answers.command';
import { ScoreInfoDto } from './dto/score-info.dto';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestionsEntity)
    public quizQuestionsRepository: Repository<QuizQuestionsEntity>,
    @InjectRepository(QuizAnswersEntity)
    public quizAnswersRepository: Repository<QuizAnswersEntity>,
    public readonly vacancyService: VacancyService,
  ) {}

  async store(data: StoreQuestionCommand) {
    data.id = uuid();
    if (!(await this.validateVacancy(data.vacancyId))) {
      throw new BadRequestException("Вакансия по id не найдена")
    }
    return (await this.quizQuestionsRepository.save(data)).id;
  }

  async find(vacancyId?: string) {
    return (await this.quizQuestionsRepository.find({ where: {vacancyId: vacancyId} })).map((question) => {
      return new GetQuestionCommand(question);
    })
  }

  async validateVacancy(id: string) {
    return (await this.vacancyService.find(id)).length > 0
  }

  async storeAnswers(command: SendAnswersCommand) {
    const questionIds = command.data.map((answer) => {
      return answer.questionId;
    })
    const questions = await this.quizQuestionsRepository.find({ where: {id: In(questionIds)} })
    let score = 0;
    let maxScore = 0;
    command.data.forEach((answer) => {
      const question = questions.find(item => item.id == answer.questionId);
      if (question.correctAnswers.includes(answer.answer)) {
        score++;
        maxScore++;
      } else {
        maxScore++;
      }
    })
    try {
      await this.quizAnswersRepository.insert(new SaveAnswersCommand(command, score, maxScore))
    } catch(e) {
      throw new BadRequestException("Этот пользователь уже прошел тестирование")
    }
    return new ScoreInfoDto(score, maxScore);
  }
}
