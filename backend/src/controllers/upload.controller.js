import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  deleteFile,
  uploadFile,
} from "../services/upload.service.js";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const upload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "File is required.");
  }

  const { folder } = req.body;

  if (folder === "resume") {
    const isPdf =
      req.file.mimetype === "application/pdf" ||
      req.file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      throw new ApiError(400, "Only PDF files are allowed for resumes.");
    }

    if (req.file.size > MAX_RESUME_SIZE) {
      throw new ApiError(400, "Resume must be 5MB or smaller.");
    }
  }

  const resourceType =
    folder === "resume" ? "raw" : "image";

  const result = await uploadFile(
    req.file.buffer,
    folder,
    resourceType
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "File uploaded successfully"
    )
  );
});

export const removeUpload = asyncHandler(async (req, res) => {
  const { public_id: publicId } = req.body;

  if (!publicId) {
    throw new ApiError(400, "public_id is required.");
  }

  await deleteFile(publicId);

  return res.status(200).json(
    new ApiResponse(200, null, "File deleted successfully")
  );
});