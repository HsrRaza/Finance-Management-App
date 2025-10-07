import { Router } from "express";
import { loginUser, signup, getUserInfo } from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware"
import { upload } from "../middleware/upload.middleware";
import { ApiResponse } from "../utils/ApiResponse";

const router = Router()



router.post("/signup", signup)
router.post("/login", loginUser)
router.get("/getUser", protect, getUserInfo)
router.post("upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json(new ApiResponse(400, "No file uploaded"))
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/public/${req.file.filename}`;
    res.status(200).json(new ApiResponse(200, imageUrl, "image uploaded success fully"))
})
export default router