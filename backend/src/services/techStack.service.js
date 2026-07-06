import ApiError from "../utils/ApiError.js";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../models/techStack.model.js";

export const fetchCategories = () => {
  const categories = getAllCategories();

  return categories.map(parseCategory);
};

export const fetchCategory = (id) => {
  const category = getCategoryById(id);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return parseCategory(category);
};

export const addCategory = (data) => {
  const id = createCategory(data);

  return fetchCategory(id);
};

export const editCategory = (id, data) => {
  fetchCategory(id);

  updateCategory(id, data);

  return fetchCategory(id);
};

export const removeCategory = (id) => {
  fetchCategory(id);

  deleteCategory(id);
};

function parseCategory(category) {
  return {
    ...category,
    items: category.items
      ? JSON.parse(category.items)
      : [],
  };
}