import expenseModel from "../model/expense.model.js";
import incomeModel from "../model/income.model.js";
import mongoose from "mongoose";

export const getDashBoardData = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    /* ============================================================
       1️⃣ MONTHLY INCOME
    ============================================================ */
    const monthlyIncome = await incomeModel.aggregate([
      { $match: { userID: userObjectId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalIncome: { $sum: { $toDouble: "$amount" } }
        }
      }
    ]);

    /* ============================================================
       2️⃣ MONTHLY EXPENSE
    ============================================================ */
    const monthlyExpense = await expenseModel.aggregate([
      { $match: { userID: userObjectId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalExpense: { $sum: { $toDouble: "$amount" } }
        }
      }
    ]);

    /* ============================================================
       3️⃣ MERGE MONTHLY DATA
    ============================================================ */
    const monthlyMap = {};

    monthlyIncome.forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      monthlyMap[key] = {
        year: item._id.year,
        month: item._id.month,
        income: item.totalIncome,
        expense: 0
      };
    });

    monthlyExpense.forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          year: item._id.year,
          month: item._id.month,
          income: 0,
          expense: item.totalExpense
        };
      } else {
        monthlyMap[key].expense = item.totalExpense;
      }
    });

    const monthlySummary = Object.values(monthlyMap).sort(
      (a, b) => a.year - b.year || a.month - b.month
    );

    /* ============================================================
       4️⃣ TOTALS
    ============================================================ */
    const totalIncome = monthlySummary.reduce((sum, m) => sum + m.income, 0);
    const totalExpense = monthlySummary.reduce((sum, m) => sum + m.expense, 0);
    const totalBalance = totalIncome - totalExpense;

    /* ============================================================
       5️⃣ LAST 60 DAYS INCOME
    ============================================================ */
    const last60DaysIncomeTransactions = await incomeModel
      .find({
        userID: userObjectId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
      })
      .sort({ date: -1 })
      .lean();

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + Number(txn.amount),
      0
    );

    /* ============================================================
       6️⃣ LAST 30 DAYS EXPENSE
    ============================================================ */
    const last30DaysExpenseTransactions = await expenseModel
      .find({
        userID: userObjectId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
      .sort({ date: -1 })
      .lean();

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + Number(txn.amount),
      0
    );

    /* ============================================================
       7️⃣ ALL TRANSACTIONS (FULL HISTORY)
    ============================================================ */
    const incomes = await incomeModel.find({ userID: userObjectId }).lean();
    const expenses = await expenseModel.find({ userID: userObjectId }).lean();

    const transactions = [
      ...incomes.map(i => ({ ...i, type: "income" })),
      ...expenses.map(e => ({ ...e, type: "expense" }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    /* ============================================================
       8️⃣ RECENT 5 TRANSACTIONS (COMBINED)
    ============================================================ */
    const recentTransactions = transactions.slice(0, 5);

    /* ============================================================
       FINAL RESPONSE
    ============================================================ */
    res.status(200).json({
      monthlySummary,

      totals: {
        income: totalIncome,
        expense: totalExpense,
        balance: totalBalance
      },

      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions
      },

      recentTransactions,
      transactions
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};