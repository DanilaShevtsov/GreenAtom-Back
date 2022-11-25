import { Injectable } from '@nestjs/common';
const dotenv = require('dotenv').config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
