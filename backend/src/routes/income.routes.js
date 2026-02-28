import express from "express";

import { addIncome, deleteIncome, downloadIncomeExcel } from "../controllers/incomeController.js";

import { protectRoute } from "../middleware/authMiddleware.js";
import { getAllIncome } from "../controllers/incomeController.js";


const router=express.Router();

router.post("/add",protectRoute,addIncome);
router.get("/get",protectRoute,getAllIncome);
router.get("/downloadexcel",protectRoute,downloadIncomeExcel);
router.delete("/:id",protectRoute,deleteIncome);


export default router;