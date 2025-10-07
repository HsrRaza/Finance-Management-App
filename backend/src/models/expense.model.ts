import mongoose, {Model, model } from "mongoose";

interface IExpense{
    userId:string,
    icon?:string,
    category:string,
    amount:Number,
    date:Date
}

const ExpenseSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    icon:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date, 
        default:Date.now
    }
    
}, {timestamps:true})

export const Expense:Model<IExpense> = model<IExpense>("Expense", ExpenseSchema)