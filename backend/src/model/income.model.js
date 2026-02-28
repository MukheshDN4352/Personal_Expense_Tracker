import mongoose from "mongoose";

const incomeSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    icon:{
        type:String
    },
    source:{
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

const incomeModel=mongoose.model.Income || mongoose.model('Income',incomeSchema);
export default incomeModel;