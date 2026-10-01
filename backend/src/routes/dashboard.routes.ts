import { Router } from "express";
import { getdashBoardData } from "../controllers/dashboard.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, getdashBoardData);

export default router;