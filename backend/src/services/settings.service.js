import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";

import {
  findAdminById,
  findAdminByUsername,
  updateAdminUsername,
} from "../models/admin.model.js";
import {
  getProfile,
  updateProfile,
} from "../models/profile.model.js";

export const fetchSettings = (adminId) => {
  const admin = findAdminById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  const profile = getProfile();

  return {
    username: admin.username,
    email: profile?.email ?? "",
    cloudinaryConnected: Boolean(
      env.CLOUDINARY_CLOUD_NAME &&
        env.CLOUDINARY_API_KEY &&
        env.CLOUDINARY_API_SECRET
    ),
  };
};

export const updateSettings = (adminId, data) => {
  const admin = findAdminById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  const profile = getProfile();

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  if (data.username !== admin.username) {
    const existingAdmin = findAdminByUsername(data.username);

    if (existingAdmin && existingAdmin.id !== adminId) {
      throw new ApiError(409, "Username already exists.");
    }

    updateAdminUsername(adminId, data.username);
  }

  updateProfile({
    ...profile,
    email: data.email,
  });

  return fetchSettings(adminId);
};