import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Expense } from "../models/expense.model";
import xlsx from "xlsx"


export const addExpense = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id;
    console.log("user", userId);




    const { icon, category, amount } = req.body;
    console.log("inside try ");
    console.log("req body", req.body);



    if (!category || !amount) {
        throw new ApiError(404, "ALl fields are required");

    }
    console.log("after filds check");


    console.log("before creating expense");

    const expense = await Expense.create({
        userId,
        icon,
        category,
        amount,
        date: new Date().toISOString().split("T")[0]
    })
    console.log("after creating expense ");


    console.log("Expense added", expense);


    if (!expense) {
        throw new ApiError(404, "Unable to create Data")
    }

    return res.status(200).json(new ApiResponse(201, expense, "Expense Added Successfully "))



})
export const getExpenses = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id;

    const expense = await Expense.find({ userId }).sort({ date: -1 })

    if (!expense) {
        throw new ApiError(404, "Unable to fetch data")
    }

    return res.status(200).json(new ApiResponse(200, expense, "Data fetched Successfully"))

})
export const downloadExcel = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (!expense) {
        throw new ApiError(404, "data unable to fetched ")
    }

    const data = expense.map((item) => ({
        Category: item.category,
        Amount:item.amount,
        Date:item.date

    }))

    const wb = xlsx.utils.book_new();
    const ws =xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx")

    res.download("expense_details.xlsx");
})
export const deleteExpense = asyncHandler(async (req: Request, res: Response) => {
    const removeExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!removeExpense) {
        throw new ApiError(404, "Unable to delete Data")
    }

    return res.status(200).json(new ApiResponse(200, removeExpense, "Expense deleted successfully "))
})