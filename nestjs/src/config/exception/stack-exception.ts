import { HttpException } from "@nestjs/common";

export class StackException {
  readonly statusCode: number;
  readonly message: string | Error | undefined = undefined;
  readonly error: string | undefined = undefined;
  readonly details: string | Error | undefined = undefined;

  constructor(statusCode: number, message?: string, error?: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }

  public throw(
    id: string | object,
    details: string | Error | undefined = undefined,
  ) {
    new HttpException(
      {
        statusCode: this.statusCode,
        message: this.message || undefined,
        error: this.error || undefined,
        details: `[${id && JSON.stringify(id)}] ${details || ""}`,
      },
      this.statusCode,
    );
  }
}
