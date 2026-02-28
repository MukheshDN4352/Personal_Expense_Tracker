import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protect middleware:", error.message);

    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
};