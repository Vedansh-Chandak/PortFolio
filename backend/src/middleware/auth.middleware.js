import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";
import { findAdminById } from "../models/admin.model.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token is required.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const admin = findAdminById(decoded.id);

    if (!admin) {
      throw new ApiError(401, "Invalid or expired token.");
    }

    req.user = admin;

    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, "Invalid or expired token.")
    );
  }
};

export default authenticate;