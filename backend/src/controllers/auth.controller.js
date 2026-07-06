import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  loginAdmin,
  changeAdminPassword,
} from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const data = await loginAdmin(username, password);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Login successful"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await changeAdminPassword(req.user.id, currentPassword, newPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});