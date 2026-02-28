import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"

import { createBudgetCycle, fetchTheData, deleteBudgetCycle,downloadBudgetCycle,getAllBudgetCycles} from "../controllers/budgetCycleController.js"

const router=express.Router()

router.post("/create",protectRoute,createBudgetCycle);
router.get("/get/:id",protectRoute,fetchTheData);
router.get("/getAll",protectRoute,getAllBudgetCycles)
router.delete("/:id",protectRoute,deleteBudgetCycle);
router.get("/download/:id",protectRoute,downloadBudgetCycle);

export default router