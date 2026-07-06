import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchExperiences,
  addExperience,
  editExperience,
  removeExperience,
} from "../services/experience.service.js";

export const getExperiences = asyncHandler(async (req, res) => {
  const experiences = fetchExperiences();

  return res.status(200).json(
    new ApiResponse(
      200,
      experiences,
      "Experiences fetched successfully"
    )
  );
});

export const createExperience = asyncHandler(async (req, res) => {
  const experience = addExperience(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      experience,
      "Experience created successfully"
    )
  );
});

export const updateExperience = asyncHandler(async (req, res) => {
  const experience = editExperience(
    Number(req.params.id),
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      experience,
      "Experience updated successfully"
    )
  );
});

export const deleteExperience = asyncHandler(async (req, res) => {
  removeExperience(Number(req.params.id));

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Experience deleted successfully"
    )
  );
});