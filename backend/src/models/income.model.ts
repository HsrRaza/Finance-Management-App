import mongoose, { Model, model } from "mongoose";

interface Iincome {
    userId: string,
    incon?: string,
    source: string,
    amount: string
    date: Date

}

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    icon: {
        type: String,
    },
    source: {  // ex: Salaray , freelance, etc
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },


}, { timestamps: true })


 export const Income:Model<Iincome> = model<Iincome>("Income", IncomeSchema) 
