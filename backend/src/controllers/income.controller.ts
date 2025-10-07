import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Income } from "../models/income.model";


import xlsx from "xlsx"

export const addIncome = asyncHandler(async (req: Request, res: Response) => {




    const userId = req.user.id;

    // console.log(" User in request", userId);


    try {
        const { icon, source, amount } = req.body;

        // Validation : check for missing fields 

        if (!source || !amount) {
            throw new ApiError(400, "ALl fields are required")
        }
        //   console.log("before creating new income");


        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date().toISOString().split("T")[0],

        });



        // console.log("after creating income" , newIncome);


        if (!newIncome) {
            throw new ApiError(404, "Unable to create a new Income")
        }

        //   console.log("finished income");


        return res.status(200).json(new ApiResponse(201, newIncome, "Income created successfully "))



    } catch (error) {

        return res.status(500).json(new ApiError(500, "server Error",))


    }


})
export const getAllIncome = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id;
    try {

        const income = await Income.find({ userId }).sort({ date: -1 });
        console.log("income", income);
        
        if(!income){
            throw new ApiError(404, "unable to fetched income")
        }

        return res.status(200).json(new ApiResponse (200, income, "Data fetched Successfully"))
            

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Server problem"))

    }



})
export const downloadIncomeExecel = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id;
      
    try {
        const income = await Income.find({userId}).sort({date:-1});

        // prepare data for Execel 

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, "income_details.xlsx")

        res.download('income_details.xlsx');
        
    } catch (error) {
        
    }

})
export const deleteIncome = asyncHandler(async (req: Request, res: Response) => {


    try {
    const deletingIncome =    await Income.findByIdAndDelete(req.params.id);

    if(!deletingIncome){
        throw new ApiError(404, "unable to delete Income")
    }

    return res.status(200).json(new ApiResponse(200, deletingIncome, "Income Successfully deleted "))
    


    } catch (error) {

        return res.status(500).json(new ApiError(500, "Server problem "))
    }



})
