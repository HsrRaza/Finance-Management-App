export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];

  constructor(statusCode: number, message: string = "Something went wrong", errors: any[] = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}