import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchProfile,
  editProfile,
} from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = fetchProfile();

  return res.json(
    new ApiResponse(
      200,
      profile,
      "Profile fetched successfully"
    )
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = editProfile(req.body);

  return res.json(
    new ApiResponse(
      200,
      profile,
      "Profile updated successfully"
    )
  );
});