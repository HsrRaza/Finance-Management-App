import  express, { Application }  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app:Application = express()
app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json( { limit:"16kb"}))

app.use(express.urlencoded({extended:true, limit: "16kb"}))

export {app}