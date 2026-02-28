import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import budgetCycleRoutes from "./routes/budgetCycle.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const __dirname=path.resolve();

// ✅ CORS CONFIGURATION
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgetCycle", budgetCycleRoutes);





app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});