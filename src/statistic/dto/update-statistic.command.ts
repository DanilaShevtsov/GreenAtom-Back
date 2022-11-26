export class UpdateStatisticCommand {
  vacancyId?: string;
  type?: string;
  
  constructor(vacancyId?: string, type?: string) {
    this.vacancyId = vacancyId;
    this.type = type;
  }
  }
  