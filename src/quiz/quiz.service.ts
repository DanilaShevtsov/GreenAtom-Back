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
import { VacancyEntity } from 'src/vacancy/entities/vacancy.entity';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestionsEntity)
    public quizQuestionsRepository: Repository<QuizQuestionsEntity>,
    @InjectRepository(QuizAnswersEntity)
    public quizAnswersRepository: Repository<QuizAnswersEntity>,
    public readonly vacancyService: VacancyService,
    public readonly emailSenderService: EmailSenderService,
    public readonly userService: UserService,
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
      if (await this.validateAnswers(command.vacancyId, command.userId)) {
        await this.quizAnswersRepository.insert(new SaveAnswersCommand(command, score, maxScore));
      } else {
        throw new BadRequestException("Этот пользователь уже прошел тестирование");
      }
    const vacancy = (await this.vacancyService.findWithoutParse('027c8666-f99b-4803-867e-3912ee019027'))[0]
    const user = await this.userService.find(command.userId);
    await this.emailSenderService.sendEmail(vacancy.hr.email, 
      `${user[0].email} отправил запрос на прохождение стажировки по направлению ${vacancy.title}. Тест: ${score} правильных ответов их ${maxScore}`
      )
    return new ScoreInfoDto(score, maxScore);
  }

  async getAnswers(vacancyId?: string, userId?: string ) {
    return await this.quizAnswersRepository.find({where: {vacancyId: vacancyId, userId: userId}})
  }

  async validateAnswers(vacancyId: string, userId: string) {
    const answers = await this.quizAnswersRepository.find({where: {vacancyId: vacancyId, userId: userId}});
    return answers.length == 0;
  }
}
