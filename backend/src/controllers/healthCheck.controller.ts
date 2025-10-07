import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const healthCheck = asyncHandler (async (req:Request, res:Response) =>{
       try {
    console.log("logic to connect with db");

    res.status(200).json(
      new ApiResponse(200, { message: "Server is running" })
    )
  } catch (error) {

  }
})