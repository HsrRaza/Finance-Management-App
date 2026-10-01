import { Router } from "express";
import { getTransactions } from "../controllers/transaction.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { transactionFilterSchema } from "../validators/transaction.validator";

const router = Router();

router.get("/", protect, validate(transactionFilterSchema, "query"), getTransactions);

export default router;
