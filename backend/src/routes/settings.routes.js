import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { settingsSchema } from "../validators/settings.validator.js";

import {
  getSettings,
  saveSettings,
} from "../controllers/settings.controller.js";

const router = Router();

router.get("/", authenticate, getSettings);
router.put("/", authenticate, validate(settingsSchema), saveSettings);

export default router;