import express from "express"
import { config } from "dotenv"
import cors from "cors"
import { connectDb } from "./src/utils/db"

import { app } from "./app"


config()

const port = process.env.PORT ?? 5002
// const app = express();

// db connection

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started successfully on port: ${port}`);


        })

    })
    .catch( (err) =>{
        console.log("MONGO db connection failed !!! ", err);
        
    })



