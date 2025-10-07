import jwt from "jsonwebtoken"

import { User } from "../models/user.models"
import { Request, Response, NextFunction } from "express"

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"


 const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);

        if (!token) {
            throw new ApiError(401, "Unathorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        // console.log("decoded token", decodedToken);
        

        const user = await User.findById((decodedToken as any).user).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Inavlid Access Token")
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401,  "Invalid access token")

    }

})

export {protect}