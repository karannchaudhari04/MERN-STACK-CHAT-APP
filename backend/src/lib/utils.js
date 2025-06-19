import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,                   // prevent XSS
    secure: process.env.NODE_ENV !== "development", // true on production
    sameSite: "None",                // allow cross-site cookies (Vercel ↔ Render)
  });

  return token;
};
