import express from "express"

import { sendOtpForRegister, } from "../controllers/authControllers.js"
import { verifyOtpAndRegister } from "../controllers/authControllers.js"
import { login } from "../controllers/authControllers.js";
import { logout } from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { checkAuth } from "../controllers/authControllers.js";
import { updateProfile } from "../controllers/authControllers.js";
const router =express.Router();


router.post("/send-otp", sendOtpForRegister);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth);


export default router;