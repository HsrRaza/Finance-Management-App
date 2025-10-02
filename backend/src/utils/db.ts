import mongoose from "mongoose";

export const connectDb:()=> Promise<void> = async ()=> {

    try {

        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connection to DB established ");
        
        
    } catch (err: any) {
        console.log("Error connecting to DB", err.message);
        process.exit(1)
        
    }
} 