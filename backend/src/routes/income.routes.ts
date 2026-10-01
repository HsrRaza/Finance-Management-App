import { Router } from "express";
import { addIncome, getAllIncome, deleteIncome, downloadIncomeExecel } from "../controllers/income.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { addIncomeSchema } from "../validators/income.validator";

const router = Router();

router.post("/add", protect, validate(addIncomeSchema), addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadExcel", protect, downloadIncomeExecel);
router.delete("/:id", protect, deleteIncome);

export default router;