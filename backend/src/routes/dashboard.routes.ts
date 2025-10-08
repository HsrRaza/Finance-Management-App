import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getdashBoardData } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", protect, getdashBoardData)

export default router