import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSenderService {
  public transporter: any;
  constructor(
  ) {
  }

  async onModuleInit() {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'mona.little88@ethereal.email',
          pass: 'xn8dD9Wt1mhjGN1YWD'
    }
    });
  }

  async sendEmail(email: string, text: string) {
    await this.transporter.sendMail({
        from: 'mona.little88@ethereal.email',
        to: email,
        subject: 'Message from Devopsina Junior',
        text: text,
    })
  }
}
