export class UpdateVacancyCommand {
  title?: string;
  preview?: string;
  description?: string;
  city?: string;

  constructor(title?: string, preview?: string, description?: string, city?: string) {
    this.title = title;
    this.preview = preview;
    this.description = description;
    this.city = city;
  }
}
