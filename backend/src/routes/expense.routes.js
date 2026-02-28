import express from "express"
import { addExpense,getAllExpense,deleteExpense,downloadExpenseExcel } from "../controllers/expenseController.js"

import { protectRoute } from "../middleware/authMiddleware.js"

const router=express.Router();

router.post('/add',protectRoute,addExpense);
router.get('/get',protectRoute,getAllExpense);
router.get("/downloadexcel",protectRoute,downloadExpenseExcel);
router.delete('/:id',protectRoute,deleteExpense);

export default router
