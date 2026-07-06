import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/", getProfile);

router.put("/", authenticate, updateProfile);

export default router;