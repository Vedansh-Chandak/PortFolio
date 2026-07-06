import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { experienceSchema } from "../validators/experience.validator.js";

import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

const router = Router();

// Public
router.get("/", getExperiences);

// Protected
router.post(
  "/",
  authenticate,
  validate(experienceSchema),
  createExperience
);

router.put(
  "/:id",
  authenticate,
  validate(experienceSchema),
  updateExperience
);

router.delete(
  "/:id",
  authenticate,
  deleteExperience
);

export default router;