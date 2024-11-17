import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extracting Bearer token

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password"); // Fetching user without password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attaching user to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;
