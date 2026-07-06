import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { projectSchema } from "../validators/project.validator.js";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = Router();

/* ---------- Public ---------- */

router.get("/", getProjects);

router.get("/:id", getProject);

/* ---------- Protected ---------- */

router.post(
  "/",
  authenticate,
  validate(projectSchema),
  createProject
);

router.put(
  "/:id",
  authenticate,
  validate(projectSchema),
  updateProject
);

router.delete(
  "/:id",
  authenticate,
  deleteProject
);

export default router;