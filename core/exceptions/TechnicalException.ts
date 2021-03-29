export class TechnicalException implements Error {
  name: string;
  stack?: string | undefined;
  message: string;

  constructor(message: string) {
    this.name = "Technical Exception";
    this.message = message;
  }
}
