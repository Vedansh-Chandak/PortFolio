import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchProjects,
  fetchProject,
  addProject,
  editProject,
  removeProject,
} from "../services/project.service.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = fetchProjects();

  return res.status(200).json(
    new ApiResponse(
      200,
      projects,
      "Projects fetched successfully"
    )
  );
});

export const getProject = asyncHandler(async (req, res) => {
  const project = fetchProject(Number(req.params.id));

  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      "Project fetched successfully"
    )
  );
});

export const createProject = asyncHandler(async (req, res) => {
  const project = addProject(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      project,
      "Project created successfully"
    )
  );
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = editProject(
    Number(req.params.id),
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      "Project updated successfully"
    )
  );
});

export const deleteProject = asyncHandler(async (req, res) => {
  removeProject(Number(req.params.id));

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Project deleted successfully"
    )
  );
});