import bcrypt from "bcryptjs";

import {
  findAdminByUsername,
  findAdminCredentialsById,
  updateAdminPassword,
} from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const loginAdmin = async (username, password) => {
  const admin = findAdminByUsername(username);

  if (!admin) {
 throw new ApiError(401, "Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid username or password");
  }

  const token = generateToken({
    id: admin.id,
    username: admin.username,
  });

  return {
    token,
    admin: {
      id: admin.id,
      username: admin.username,
    },
  };
};

export const changeAdminPassword = async (
  adminId,
  currentPassword,
  newPassword
) => {
  const admin = findAdminCredentialsById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);

  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect.");
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  updateAdminPassword(adminId, passwordHash);

  return true;
};