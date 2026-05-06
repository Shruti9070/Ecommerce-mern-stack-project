const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "mysecretkey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided ❌" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token ❌" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const User = require("../models/User");

  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin only ❌" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Error verifying admin ❌" });
  }
};

module.exports = { verifyToken, verifyAdmin, SECRET };
