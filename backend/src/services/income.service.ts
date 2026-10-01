import { Income } from "../models/income.model";
import { ApiError } from "../utils/ApiError";

export class IncomeService {
  static async addIncome(userId: string, data: { source: string; amount: number; date?: string; icon?: string }) {
    const income = await Income.create({
      userId,
      source: data.source,
      amount: data.amount,
      date: data.date ? new Date(data.date) : new Date(),
      icon: data.icon,
    });
    return income;
  }

  static async getIncomes(userId: string) {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    return incomes;
  }

  static async deleteIncome(userId: string, incomeId: string) {
    const income = await Income.findOneAndDelete({ _id: incomeId, userId });
    if (!income) {
      throw new ApiError(404, "Income record not found or unauthorized");
    }
    return income;
  }
}
