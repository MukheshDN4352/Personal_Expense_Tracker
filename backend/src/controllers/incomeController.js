import userModel from "../model/user.model.js";
import incomeModel from "../model/income.model.js";
import xlsx from "xlsx";

//this function is used to add income
export const addIncome=async(req,res)=>{
    const userID=req.user.id;
    try {
        const {icon, source, amount, date}=req.body;
        if(!source || !amount || !date){
            return res.status(400).json({message:"All fields are mandatory"})
        }
        const newIncome=new incomeModel({
            userID,
            icon,
            source,
            amount,
            date:new Date(date)
        })
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

}

//get all incomes
export const getAllIncome=async(req,res)=>{
    const userID=req.user.id;
    try{
        const income=await incomeModel.find({userID}).sort({date:-1});
        res.json(income);
    }catch(error){
        res.status(500).json({message:"Internal server error"+error})
    }
}

//delete income source
export const deleteIncome=async (req,res) => {
    try {
        await incomeModel.findByIdAndDelete(req.params.id)
        res.json({message:"Income deleted succesfully"})
    } catch (error) {
        res.status(500).json({message:"internal server error"+error})
    }
}

//download income excel
export const downloadIncomeExcel=async(req,res)=>{
    const userID=req.user.id;
    try {
       const income =await incomeModel.find({userID}).sort({date:-1});
       const data=income.map((item)=>({
        Source:item.source,
        Amount:item.amount,
        Date:item.date
       }) );

       const wb=xlsx.utils.book_new();
       const ws=xlsx.utils.json_to_sheet(data);
       xlsx.utils.book_append_sheet(wb,ws,"Income")
       xlsx.writeFile(wb,"income_details.xlsx")
       res.download("income_details.xlsx")
    } catch (error) {
        res.status(500).json({message:"Internal server error"+error})
    }
}