import ApiError from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";

import {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../models/project.model.js";

export const fetchProjects = () => {
  const projects = getAllProjects();

  return projects.map(parseProject);
};

export const fetchProject = (id) => {
  const project = getProjectById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return parseProject(project);
};

export const addProject = (data) => {
  const slug = slugify(data.title);

  const existingProject = getProjectBySlug(slug);

  if (existingProject) {
    throw new ApiError(409, "Project with this title already exists.");
  }

  const id = createProject({
    ...data,
    slug,
  });

  return fetchProject(id);
};

export const editProject = (id, data) => {
  const existingProject = fetchProject(id);

  const slug = slugify(data.title);

  const duplicate = getProjectBySlug(slug);

  if (duplicate && duplicate.id !== id) {
    throw new ApiError(409, "Project with this title already exists.");
  }

  updateProject(id, {
    ...existingProject,
    ...data,
    slug,
  });

  return fetchProject(id);
};

export const removeProject = (id) => {
  fetchProject(id);

  deleteProject(id);
};

function parseProject(project) {
  return {
    ...project,
    features: project.features
      ? JSON.parse(project.features)
      : [],
    tech: project.tech
      ? JSON.parse(project.tech)
      : [],
    is_featured: Boolean(project.is_featured),
  };
}