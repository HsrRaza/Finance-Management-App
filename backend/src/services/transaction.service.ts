import mongoose from "mongoose";
import { Income } from "../models/income.model";
import { Expense } from "../models/expense.model";

export interface TransactionQueryParams {
  type?: "all" | "income" | "expense";
  category?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export class TransactionService {
  static async getTransactions(userId: string, query: TransactionQueryParams) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const type = query.type || "all";
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;
    const userObjId = new mongoose.Types.ObjectId(userId);

    const dateFilter: any = {};
    if (query.startDate || query.endDate) {
      dateFilter.date = {};
      if (query.startDate) dateFilter.date.$gte = new Date(query.startDate);
      if (query.endDate) dateFilter.date.$lte = new Date(query.endDate);
    }

    let incomes: any[] = [];
    let expenses: any[] = [];

    if (type === "all" || type === "income") {
      const incomeQuery: any = { userId: userObjId, ...dateFilter };
      if (query.search) {
        incomeQuery.source = { $regex: query.search, $options: "i" };
      }
      incomes = await Income.find(incomeQuery).lean();
      incomes = incomes.map((inc) => ({
        ...inc,
        type: "income",
        title: inc.source,
      }));
    }

    if (type === "all" || type === "expense") {
      const expenseQuery: any = { userId: userObjId, ...dateFilter };
      if (query.category) {
        expenseQuery.category = query.category;
      }
      if (query.search) {
        expenseQuery.$or = [
          { category: { $regex: query.search, $options: "i" } },
          { source: { $regex: query.search, $options: "i" } },
        ];
      }
      expenses = await Expense.find(expenseQuery).lean();
      expenses = expenses.map((exp) => ({
        ...exp,
        type: "expense",
        title: exp.category,
      }));
    }

    let combined = [...incomes, ...expenses];

    // Filter by category if requested on all
    if (query.category && type === "all") {
      combined = combined.filter(
        (t) => (t.type === "expense" && t.category === query.category) || (t.type === "income" && t.source === query.category)
      );
    }

    // Sort combined records
    combined.sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return (dateA - dateB) * sortOrder;
    });

    const total = combined.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const items = combined.slice(startIndex, startIndex + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
