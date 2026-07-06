import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import { ALLOWED_FOLDERS } from "../constants/uploadFolders.js";

export const uploadFile = (
  buffer,
  folder,
  resourceType = "image"
) => {
  const uploadFolder = ALLOWED_FOLDERS[folder];

  if (!uploadFolder) {
    throw new ApiError(400, "Invalid upload folder.");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: uploadFolder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const deleteFile = async (publicId) => {
  if (!publicId) return;

  return cloudinary.uploader.destroy(publicId);
};