export class BusinessException implements Error {
  name: string;
  stack?: string | undefined;
  message: string;

  constructor(message: string) {
    this.name = "Business Exception";
    this.message = message;
  }
}
