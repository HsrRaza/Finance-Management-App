import { Router } from "express";
import { addExpense, getExpenses, deleteExpense, downloadExcel } from "../controllers/expense.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { addExpenseSchema } from "../validators/expense.validator";

const router = Router();

router.post("/add", protect, validate(addExpenseSchema), addExpense);
router.get("/get", protect, getExpenses);
router.get("/downloadExcel", protect, downloadExcel);
router.delete("/:id", protect, deleteExpense);

export default router;