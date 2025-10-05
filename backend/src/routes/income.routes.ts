import express from "express"
import {} from "../controllers/income.controllers"

import { protect } from "../middleware/auth.middleware";

const router= express.Router()

router.post("/add", protect)
router.get("/get", protect)
router.get("/downloadExcel", protect,)
router.delete("/:id", protect)






export default router