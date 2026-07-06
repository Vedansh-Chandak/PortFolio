import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchSettings,
  updateSettings,
} from "../services/settings.service.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = fetchSettings(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, settings, "Settings fetched successfully"));
});

export const saveSettings = asyncHandler(async (req, res) => {
  const settings = updateSettings(req.user.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, settings, "Settings updated successfully"));
});