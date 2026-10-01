import mongoose from "mongoose";
import { Income } from "../models/income.model";
import { Expense } from "../models/expense.model";

export class DashboardService {
  static async getDashboardMetrics(userId: string, periodDays: number = 30) {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const now = new Date();

    const dateCutoff = new Date();
    dateCutoff.setDate(now.getDate() - periodDays);

    const prevDateCutoff = new Date();
    prevDateCutoff.setDate(dateCutoff.getDate() - periodDays);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(now.getDate() - 60);

    // 1. Total Income Pipeline
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeResult[0]?.total || 0;

    // 2. Total Expense Pipeline
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = totalExpenseResult[0]?.total || 0;

    const totalBalance = totalIncome - totalExpense;

    // 3. Period Trend Calculations (% change vs previous period)
    const currentIncomeRes = await Income.aggregate([
      { $match: { userId: userObjId, date: { $gte: dateCutoff } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const currentIncome = currentIncomeRes[0]?.total || 0;

    const prevIncomeRes = await Income.aggregate([
      { $match: { userId: userObjId, date: { $gte: prevDateCutoff, $lt: dateCutoff } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const prevIncome = prevIncomeRes[0]?.total || 0;

    const currentExpenseRes = await Expense.aggregate([
      { $match: { userId: userObjId, date: { $gte: dateCutoff } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const currentExpense = currentExpenseRes[0]?.total || 0;

    const prevExpenseRes = await Expense.aggregate([
      { $match: { userId: userObjId, date: { $gte: prevDateCutoff, $lt: dateCutoff } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const prevExpense = prevExpenseRes[0]?.total || 0;

    const calcTrend = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Number((((curr - prev) / prev) * 100).toFixed(1));
    };

    const incomeTrend = calcTrend(currentIncome, prevIncome);
    const expenseTrend = calcTrend(currentExpense, prevExpense);
    const currentNet = currentIncome - currentExpense;
    const prevNet = prevIncome - prevExpense;
    const balanceTrend = calcTrend(currentNet, prevNet);

    // 4. Last 30 Days Expense & Last 60 Days Income
    const last30DaysExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjId, date: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const last30DaysExpense = last30DaysExpenseResult[0]?.total || 0;

    const last60DaysIncomeResult = await Income.aggregate([
      { $match: { userId: userObjId, date: { $gte: sixtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const last60DaysIncome = last60DaysIncomeResult[0]?.total || 0;

    // 5. Category Breakdown Aggregation Pipeline
    const categoryAgg = await Expense.aggregate([
      { $match: { userId: userObjId } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
    ]);

    const categoryBreakdown = categoryAgg.map((cat) => ({
      category: cat._id,
      amount: cat.totalAmount,
      percentage: totalExpense > 0 ? Number(((cat.totalAmount / totalExpense) * 100).toFixed(1)) : 0,
    }));

    // 6. Daily Chart Trend Data
    const incomeTrendAgg = await Income.aggregate([
      { $match: { userId: userObjId, date: { $gte: dateCutoff } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const expenseTrendAgg = await Expense.aggregate([
      { $match: { userId: userObjId, date: { $gte: dateCutoff } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const dateMap: Record<string, { income: number; expense: number }> = {};

    incomeTrendAgg.forEach((item) => {
      dateMap[item._id] = { income: item.totalIncome, expense: 0 };
    });

    expenseTrendAgg.forEach((item) => {
      if (!dateMap[item._id]) {
        dateMap[item._id] = { income: 0, expense: item.totalExpense };
      } else {
        dateMap[item._id].expense = item.totalExpense;
      }
    });

    const chartData = Object.keys(dateMap)
      .sort()
      .map((date) => ({
        date,
        income: dateMap[date].income,
        expense: dateMap[date].expense,
      }));

    // 7. Monthly Income vs Expense Comparison (Last 12 Months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(now.getMonth() - 11);
    twelveMonthsAgo.setDate(1);

    const monthlyIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjId, date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjId, date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const monthMap: Record<string, { income: number; expense: number }> = {};
    monthlyIncomeAgg.forEach((item) => {
      monthMap[item._id] = { income: item.total, expense: 0 };
    });
    monthlyExpenseAgg.forEach((item) => {
      if (!monthMap[item._id]) {
        monthMap[item._id] = { income: 0, expense: item.total };
      } else {
        monthMap[item._id].expense = item.total;
      }
    });

    const monthlyData = Object.keys(monthMap)
      .sort()
      .map((month) => ({
        month,
        income: monthMap[month].income,
        expense: monthMap[month].expense,
      }));

    // 8. Recent Transactions (Top 5 Incomes + Top 5 Expenses merged)
    const recentIncomes = await Income.find({ userId: userObjId }).sort({ date: -1 }).limit(5).lean();
    const recentExpenses = await Expense.find({ userId: userObjId }).sort({ date: -1 }).limit(5).lean();

    const recentTransactions = [
      ...recentIncomes.map((i) => ({ ...i, type: "income" as const, title: i.source })),
      ...recentExpenses.map((e) => ({ ...e, type: "expense" as const, title: e.category })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      balanceTrend,
      incomeTrend,
      expenseTrend,
      last30DaysExpense,
      last60DaysIncome,
      categoryBreakdown,
      chartData,
      monthlyData,
      recentTransactions,
    };
  }
}
