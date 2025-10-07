import { Request, Response } from "express";
import { IUser, User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"


export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            throw new ApiError(400, "Please fill all the fields")
        }


        let user: IUser | null;
        // console.log("before searching");


        user = await User.findOne({ email })

        if (user) {
            throw new ApiError(500, "User Already exists  Login")
        }

        // console.log("after searching");
        const securePassword = await bcrypt.hash(password, 10)


        user = await User.create({
            name, email, password: securePassword, profileImage: null,
        })

        if (!user) {
            console.log("Error");

            throw new ApiError(404, "unable a signUp")
        }
        const token = jwt.sign(
            { user: user._id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "1hr" }
        )
        //    console.log("token, ", token);

        return res.status(201).cookie("token", token).json(new ApiResponse(201, { user, token }, "User created Successfully"))


    } catch (error: any) {
        return new ApiError(500, "Internal Server Error")

    }

})
export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError(404, "Fill all the fields");

    }



    let user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "user not existed signup")
    }

    let comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw new ApiError(400, "Invalid email or password ")
    }

    const token = jwt.sign(
        { user: user._id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1hr" }
    )


    return res.status(200).cookie("token", token).json(new ApiResponse(201, { user, token }, "user login successfully "))

})


export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found ");
    }

    return res.status(200).json(new ApiResponse(200, user, "user fetched successfully "))

})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {


})
