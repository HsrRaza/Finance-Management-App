import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);
  
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.getUserProfile(req.user._id);
  res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"));
});
