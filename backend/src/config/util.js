import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,              // ✅ fixed case
    sameSite: "lax",             // ✅ better for localhost
    secure: false,               // ✅ must be false in localhost
  });

  return token;
};