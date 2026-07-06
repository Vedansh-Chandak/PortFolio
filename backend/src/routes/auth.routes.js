import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import {
	login,
	changePassword,
} from "../controllers/auth.controller.js";
import { changePasswordSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", login);

router.put(
	"/change-password",
	authenticate,
	validate(changePasswordSchema),
	changePassword
);

export default router;