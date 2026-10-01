import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getTransactions = asyncHandler(async (req: Request, res: Response) => {
  const result = await TransactionService.getTransactions(req.user._id, req.query as any);
  res.status(200).json(new ApiResponse(200, result, "Transactions retrieved successfully"));
});
