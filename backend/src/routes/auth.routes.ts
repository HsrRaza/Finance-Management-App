import { Router } from "express";
import { signup, loginUser, getUserInfo } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { authLimiter } from "../middlewares/rateLimit.middleware";
import { signupSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), loginUser);
router.get("/me", protect, getUserInfo);

export default router;