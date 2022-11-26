export class SaveStatisticCommand {
    vacancyId: string;
    url: number;
    readDescription: number;
    quiz: number;
    
    constructor(url: number, readDescription: number, quiz: number) {
      this.url = url;
      this.readDescription = readDescription;
      this.quiz = quiz;
    }
  }
  