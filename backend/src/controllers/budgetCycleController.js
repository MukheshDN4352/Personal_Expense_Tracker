import budgetCycleModel from "../model/budgetCycle.model.js";
import expenseModel from "../model/expense.model.js";
import xlsx from "xlsx";

// CREATE BUDGET CYCLE
export const createBudgetCycle = async (req, res) => {
  const userID = req.user.id;

  try {
    const {
      name,
      upperLimitAmount,
      startDate,
      endDate
    } = req.body;

    if (!name || !upperLimitAmount || !startDate || !endDate) {
      return res.status(400).json({
        message: "All fields are mandatory"
      });
    }

    const newBudgetCycle = new budgetCycleModel({
      userID,
      name,
      upperLimitAmount,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    await newBudgetCycle.save();

    res.status(201).json(newBudgetCycle);

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// FETCH SINGLE BUDGET CYCLE DATA
export const fetchTheData = async (req, res) => {
  try {
    const userID = req.user.id;
    const budgetCycleId = req.params.id;

    const budgetCycle = await budgetCycleModel.findOne({
      _id: budgetCycleId,
      userID
    });

    if (!budgetCycle) {
      return res.status(404).json({
        message: "Budget cycle not found"
      });
    }

    const { startDate, endDate, upperLimitAmount, name } = budgetCycle;

    const expenses = await expenseModel.find({
      userID,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    budgetCycle.expenseIds = expenses.map(exp => exp._id);
    await budgetCycle.save();

    const remainingAmount =
      Number(upperLimitAmount) - totalExpenses;

    res.status(200).json({
      budgetCycle: {
        _id: budgetCycle._id,
        name,
        upperLimitAmount: Number(upperLimitAmount),
        startDate,
        endDate
      },
      totalExpenses,
      remainingAmount,
      expenses
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// DELETE BUDGET CYCLE
export const deleteBudgetCycle = async (req, res) => {
  try {
    await budgetCycleModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget cycle deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error " + error
    });
  }
};

// DOWNLOAD BUDGET CYCLE EXPENSES
export const downloadBudgetCycle = async (req, res) => {
  const userID = req.user.id;
  const budgetCycleId = req.params.id;

  try {
    const budgetCycle = await budgetCycleModel.findOne({
      _id: budgetCycleId,
      userID
    });

    if (!budgetCycle) {
      return res.status(404).json({
        message: "Budget cycle not found"
      });
    }

    const expenses = await expenseModel
      .find({
        _id: { $in: budgetCycle.expenseIds },
        userID
      })
      .sort({ date: -1 });

    const data = expenses.map(item => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, budgetCycle.name);

    const fileName = `budget_cycle_${budgetCycleId}.xlsx`;
    xlsx.writeFile(wb, fileName);

    res.download(fileName);

  } catch (error) {
    res.status(500).json({
      message: "Internal server error " + error
    });
  }
};

// GET ALL BUDGET CYCLES FOR A USER
export const getAllBudgetCycles = async (req, res) => {
  try {
    const userID = req.user.id;

    const budgetCycles = await budgetCycleModel.find({ userID });

    const result = [];

    for (const cycle of budgetCycles) {
      const expenses = await expenseModel.find({
        userID,
        date: {
          $gte: new Date(cycle.startDate),
          $lte: new Date(cycle.endDate)
        }
      });

      const totalExpenses = expenses.reduce(
        (sum, exp) => sum + Number(exp.amount),
        0
      );

      const remainingAmount =
        Number(cycle.upperLimitAmount) - totalExpenses;

      result.push({
        _id: cycle._id,
        name: cycle.name,
        upperLimitAmount: Number(cycle.upperLimitAmount),
        remainingAmount,
        startDate: cycle.startDate,
        endDate: cycle.endDate
      });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
