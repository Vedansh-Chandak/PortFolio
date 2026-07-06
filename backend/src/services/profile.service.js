import ApiError from "../utils/ApiError.js";

import {
  getProfile,
  updateProfile,
} from "../models/profile.model.js";

export const fetchProfile = () => {
  const profile = getProfile();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

export const editProfile = (data) => {
  updateProfile(data);

  return fetchProfile();
};