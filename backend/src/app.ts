import  express, { Application }  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app:Application = express()
app.use(cors({
    origin:process.env.CLIENT_URL ||"*",
    methods:["GET", "POST","PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
    credentials:true
}))

app.use(express.json( { limit:"16kb"}))

app.use(express.urlencoded({extended:true, limit: "16kb"}))

app.use(cookieParser())


// routes
import { healthRoute } from "./routes/check.routes";
app.use("/", healthRoute)


import authRouter from "./routes/authRoutes";
import incomeRoutes from "./routes/income.routes"
import path from "path";

// server uploades folder
app.use("/api/v1/auth", authRouter)
app.use("api/v1/income", incomeRoutes)


//server uploads after
app.use("/public", express.static(path.join(__dirname, "public")))






export {app}