import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import { Income } from "../models/income.model";
import { Expense } from "../models/expense.model";
import { isValidObjectId, Types } from "mongoose";
import { ApiError } from "../utils/ApiError";



export const getdashBoardData = asyncHandler(async (req: Request, res: Response) => {




    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId))


        // fetch total income & expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        // Get income transactions in the last 60 days

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total Income  for last 60 days


        const incomeLast60days = last60DaysIncomeTransactions.reduce(
            (sum: number, transaction: any) => sum + transaction.amount, 0
        );


        // Get Expense Transaction for last 30 days

        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get Total Expense
        const expenselast30days = last30DaysExpenseTransaction.reduce(
            (sum: number, transaction: any) => sum + transaction.amount, 0
        );

        // fetch last 5 transaction (income + expense)
        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "Income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )

        ].sort((a: any, b: any) => b.date - a.date); // Sort latest first 

        //    final Response

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,

            last30DaysExpense: {
                total: expenselast30days,
                transaction: last30DaysExpenseTransaction,
            },
            last60daysIncome: {
                total: incomeLast60days,
                transaction: last60DaysIncomeTransactions,
            },
            recentTransaction: lastTransaction

        });


    } catch (error) {
        return res.status(500).json(new ApiError(500, "Server Problem "))


    }


})