import  express, { Application }  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";

const app:Application = express()
app.use(cors({
    origin:process.env.CLIENT_URL ||"*",
    methods:["GET", "POST","PUT", "DELETE"],
    credentials:true,
    allowedHeaders:["Content-Type", "Authorization"]
}))

app.use(express.json( { limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(cookieParser())




// routes
import { healthRoute } from "./routes/check.routes";
app.use("/", healthRoute)


import authRouter from "./routes/auth.routes";
import incomeRoutes from "./routes/income.routes"
import expenseRoutes from "./routes/expense.routes"
import dashBoardRoutes from "./routes/dashboard.routes"




app.use("/api/v1/auth", authRouter)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashBoardRoutes)


//server uploads after
app.use("/public", express.static(path.join(__dirname, "public")))






export {app}