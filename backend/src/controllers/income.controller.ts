import { Request, Response } from "express";
import { IncomeService } from "../services/income.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const addIncome = asyncHandler(async (req: Request, res: Response) => {
  const income = await IncomeService.addIncome(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, income, "Income added successfully"));
});

export const getAllIncome = asyncHandler(async (req: Request, res: Response) => {
  const incomes = await IncomeService.getIncomes(req.user._id);
  res.status(200).json(new ApiResponse(200, incomes, "Income list fetched successfully"));
});

export const deleteIncome = asyncHandler(async (req: Request, res: Response) => {
  const income = await IncomeService.deleteIncome(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, income, "Income deleted successfully"));
});

export const downloadIncomeExecel = asyncHandler(async (req: Request, res: Response) => {
  const incomes = await IncomeService.getIncomes(req.user._id);
  res.status(200).json(new ApiResponse(200, incomes, "Excel data ready"));
});
