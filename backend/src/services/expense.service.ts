import { Expense } from "../models/expense.model";
import { ApiError } from "../utils/ApiError";

export class ExpenseService {
  static async addExpense(userId: string, data: { category: string; amount: number; title?: string; date?: string; icon?: string }) {
    const expense = await Expense.create({
      userId,
      category: data.category,
      amount: data.amount,
      date: data.date ? new Date(data.date) : new Date(),
      icon: data.icon,
    });
    return expense;
  }

  static async getExpenses(userId: string) {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    return expenses;
  }

  static async deleteExpense(userId: string, expenseId: string) {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });
    if (!expense) {
      throw new ApiError(404, "Expense record not found or unauthorized");
    }
    return expense;
  }
}
