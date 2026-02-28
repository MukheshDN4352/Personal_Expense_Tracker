import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { getDashBoardData } from "../controllers/dashboardController.js"

const router=express.Router();
router.get("/",protectRoute,getDashBoardData);

export default router;