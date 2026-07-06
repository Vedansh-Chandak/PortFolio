import ApiError from "../utils/ApiError.js";

import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../models/experience.model.js";

export const fetchExperiences = () => {
  const experiences = getAllExperiences();

  return experiences.map((exp) => ({
    ...exp,
    tech: exp.tech ? JSON.parse(exp.tech) : [],
  }));
};

export const addExperience = (data) => {
  const id = createExperience(data);

  return getExperience(id);
};

export const getExperience = (id) => {
  const exp = getExperienceById(id);

  if (!exp) {
    throw new ApiError(404, "Experience not found");
  }

  return {
    ...exp,
    tech: exp.tech ? JSON.parse(exp.tech) : [],
  };
};

export const editExperience = (id, data) => {
  getExperience(id);

  updateExperience(id, data);

  return getExperience(id);
};

export const removeExperience = (id) => {
  getExperience(id);

  deleteExperience(id);
};