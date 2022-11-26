export class SaveVacancyCommand {
  id: string;
  title: string;
  preview: string;
  description: string;
  city: string;
  hrId: string

  constructor(title: string, preview: string, description: string, city: string) {
    this.title = title;
    this.preview = preview;
    this.description = description;
    this.city = city;
  }
}
