import express from "express"
import {config} from "dotenv"
import cors from "cors"
import { connectDb } from "./utils/db"


config()

const port = process.env.PORT ??5002
const app = express();

// db connection

// connectDb()



app.get('/', (req, res)=>{
    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log(`Server started successfully on port: ${port}`);
    
})