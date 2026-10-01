import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import { env } from "./config/env";
import { globalLimiter } from "./middlewares/rateLimit.middleware";
import { errorHandler } from "./middlewares/error.middleware";

import authRouter from "./routes/auth.routes";
import incomeRoutes from "./routes/income.routes";
import expenseRoutes from "./routes/expense.routes";
import transactionRoutes from "./routes/transaction.routes";
import dashBoardRoutes from "./routes/dashboard.routes";

const app: Application = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(globalLimiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/dashboard", dashBoardRoutes);

// Static file uploads
app.use("/public", express.static(path.join(__dirname, "public")));

// Central Error Handler Middleware
app.use(errorHandler);

export { app };