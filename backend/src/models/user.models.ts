
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


interface IUser {
    _id?:string,
    name: string,
    email: string,
    password: string,
    profileImage?: string,
    refreshToken?: string,
   

}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,


    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
}
)





const User = model<IUser>("User", userSchema)

export { User, IUser }