import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";

import {
  removeUpload,
  upload,
} from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  uploadMiddleware.single("file"),
  upload
);

router.delete(
  "/",
  authenticate,
  removeUpload
);

export default router;