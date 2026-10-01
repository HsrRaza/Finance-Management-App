import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: ZodSchema, source: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        }));
        next(new ApiError(400, "Validation failed", issues));
      } else {
        next(error);
      }
    }
  };
};
