import { Request, Response } from "express";
import { ExpenseService } from "../services/expense.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const addExpense = asyncHandler(async (req: Request, res: Response) => {
  const expense = await ExpenseService.addExpense(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, expense, "Expense added successfully"));
});

export const getExpenses = asyncHandler(async (req: Request, res: Response) => {
  const expenses = await ExpenseService.getExpenses(req.user._id);
  res.status(200).json(new ApiResponse(200, expenses, "Expense list fetched successfully"));
});

export const deleteExpense = asyncHandler(async (req: Request, res: Response) => {
  const expense = await ExpenseService.deleteExpense(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, expense, "Expense deleted successfully"));
});

export const downloadExcel = asyncHandler(async (req: Request, res: Response) => {
  const expenses = await ExpenseService.getExpenses(req.user._id);
  res.status(200).json(new ApiResponse(200, expenses, "Excel data ready"));
});