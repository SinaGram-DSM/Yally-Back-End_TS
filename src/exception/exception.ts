export class HttpError extends Error {
  constructor(statusCode: number, message?: string) {
    super(message);
    this.name = `HttpError`;
    this["statusCode"] = statusCode;
  }
}
