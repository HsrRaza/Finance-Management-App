import { model, Schema } from "mongoose";


interface UserInfo {
    name: string,
    email: string,
    password: string,
    profileImage: string
}


const userSchema = new Schema<UserInfo>({
    name: {
        type: String,
        required: true,
        trim: true,


    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    profileImage:{
        type:String,
        default:null
    }
})

const User = model<UserInfo>("User", userSchema)

export {User}