import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.cookies?.accessToken ||
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized access. No token provided.");
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || env.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as any;

    const userId = decoded.user || decoded.id || decoded._id;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid access token. User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token.");
  }
});
