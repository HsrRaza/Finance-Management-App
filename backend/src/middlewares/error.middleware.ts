import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    ...(error.errors?.length > 0 && { errors: error.errors }),
    ...(env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};
