import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    icon:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true}

)

const expenseModel=mongoose.model.Expense || mongoose.model('Expense',expenseSchema);
export default expenseModel;

