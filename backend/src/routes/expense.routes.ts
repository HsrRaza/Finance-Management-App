import { Router } from "express";

import { protect } from "../middleware/auth.middleware";
import {
    addExpense,
    getExpenses,
    downloadExcel,
    deleteExpense
} from "../controllers/expense.controller"

const router = Router()

router.post("/add", protect, addExpense)
router.get("/get", protect, getExpenses)
router.get("/downloadExcel", protect, downloadExcel)
router.delete("/:id", protect, deleteExpense)

export default router