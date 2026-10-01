import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getdashBoardData = asyncHandler(async (req: Request, res: Response) => {
  const period = req.query.period as string;
  let days = 30;
  if (period === "7d") days = 7;
  if (period === "60d") days = 60;
  if (period === "12m" || period === "365d") days = 365;

  const data = await DashboardService.getDashboardMetrics(req.user._id, days);
  res.status(200).json(new ApiResponse(200, data, "Dashboard metrics retrieved successfully"));
});