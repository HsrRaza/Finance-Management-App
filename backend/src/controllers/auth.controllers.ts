import { User } from "../models/user.models";

import { Request, Response } from "express";


export const registerUser = async (req:Request, res:Response)=>{
    const {name, email, password} = req.body;

    try {

        if(!name || !email || !password ) {
            return  res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        
        
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
export const loginUser = async (req:Request, res:Response)=>{

}
export const logoutUser = async(req:Request, res:Response)=>{

}