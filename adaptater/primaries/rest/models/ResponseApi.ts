export class ResponseApi<T> {
  private result: T;

  private errors: Array<string>;

  public getResult(): T {
    return this.result;
  }

  public setResult(result: T): void {
    this.result = result;
  }

  public getErrors(): Array<string> {
    return this.errors;
  }

  public setErrors(errors: Array<string>): void {
    this.errors = errors;
  }

  constructor(result?: T) {
    this.result = result;
    this.errors = new Array<string>();
  }
}
