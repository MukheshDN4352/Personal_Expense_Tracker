import userModel from "../model/user.model.js";
import expenseModel from "../model/expense.model.js";
import xlsx from "xlsx";

//adding expenses
export const addExpense=async(req,res)=>{
    const  userID=req.user.id;
    try {
        const {icon, category, amount, date}=req.body;
        if(!category|| !amount ||!date){
            return res.status(400).json({message:"All fields are mandatory"}) 
        }
        const newExpense=new expenseModel({
            userID,
            icon,
            category,
            amount,
            date:new Date(date)
        })
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message:"Intenal sever error "+error})
        
    }
}


//getting all the expense
export const getAllExpense=async(req,res)=>{
    const userID=req.user.id;
    try {
        const expense=await expenseModel.find({userID}).sort({date:-1});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message:""})
    }
}

//deleting expense
export const deleteExpense=async(req,res)=>{
    try {
        await expenseModel.findByIdAndDelete(req.params.id)
        res.json({message:"expense deleted succesfully"})
    } catch (error) {
        res.status(500).json({message:"internal server error"+error})
    }
}

//dowload expense model
export const downloadExpenseExcel=async(req,res)=>{
    const userID=req.user.id;
    try {
       const expense =await expenseModel.find({userID}).sort({date:-1});
       const data=expense.map((item)=>({
        Category:item.Category,
        Amount:item.amount,
        Date:item.date
       }) );

       const wb=xlsx.utils.book_new();
       const ws=xlsx.utils.json_to_sheet(data);
       xlsx.utils.book_append_sheet(wb,ws,"Expense")
       xlsx.writeFile(wb,"expense_details.xlsx")
       res.download("expense_details.xlsx")
    } catch (error) {
        res.status(500).json({message:"Internal server error"+error})
    }
}