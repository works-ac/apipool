export class InvalidMailServerException extends Error {
  public readonly name: string;
  public readonly stack?: string;
  constructor(public readonly message) {
    super(message);
    this.name = 'InvalidMailServerException';
    this.stack = this.stack;
    this.message = message;
  }
}
