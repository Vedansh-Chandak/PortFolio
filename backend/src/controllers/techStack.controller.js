import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchCategories,
  fetchCategory,
  addCategory,
  editCategory,
  removeCategory,
} from "../services/techStack.service.js";

export const getTechStack = asyncHandler(async (req, res) => {
  const categories = fetchCategories();

  return res.status(200).json(
    new ApiResponse(
      200,
      categories,
      "Tech stack fetched successfully"
    )
  );
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = fetchCategory(Number(req.params.id));

  return res.status(200).json(
    new ApiResponse(
      200,
      category,
      "Category fetched successfully"
    )
  );
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = addCategory(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      category,
      "Category created successfully"
    )
  );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = editCategory(
    Number(req.params.id),
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      category,
      "Category updated successfully"
    )
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  removeCategory(Number(req.params.id));

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Category deleted successfully"
    )
  );
});