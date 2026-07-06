import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { techStackSchema } from "../validators/techStack.validator.js";

import {
  getTechStack,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/techStack.controller.js";

const router = Router();

/* ---------- Public ---------- */

router.get("/", getTechStack);
router.get("/:id", getCategory);

/* ---------- Protected ---------- */

router.post(
  "/",
  authenticate,
  validate(techStackSchema),
  createCategory
);

router.put(
  "/:id",
  authenticate,
  validate(techStackSchema),
  updateCategory
);

router.delete(
  "/:id",
  authenticate,
  deleteCategory
);

export default router;