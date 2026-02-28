import mongoose from "mongoose";

const budgetCycleSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    upperLimitAmount: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: Date.now
    },
    expenseIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
      }
    ]
  },
  { timestamps: true }
);

const budgetCycleModel =
  mongoose.model.budgetCycle || mongoose.model("budgetCycle", budgetCycleSchema);

export default budgetCycleModel;
