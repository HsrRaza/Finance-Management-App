import express from "express"
import {
    addIncome,
    getAllIncome,
    downloadIncomeExecel,
    deleteIncome

} from "../controllers/income.controller"

import { protect } from "../middleware/auth.middleware";

const router= express.Router()

router.post("/add", protect , addIncome)
router.get("/get", protect, getAllIncome)
router.get("/downloadExcel", protect, downloadIncomeExecel)
router.delete("/:id", protect,deleteIncome)






export default router