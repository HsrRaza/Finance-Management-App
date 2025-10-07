import { Router } from "express";

import { protect } from "../middleware/auth.middleware";

const router = Router()

router.post("/add", protect)
router.get("/get", protect)
router.get("/downloadExcel", protect)
router.delete("/:id", protect)

export default router