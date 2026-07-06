import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { messageSchema } from "../validators/message.validator.js";

import {
  getMessages,
  getMessage,
  createMessage,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = Router();

/* ---------- Public ---------- */

router.post("/", validate(messageSchema), createMessage);

/* ---------- Protected ---------- */

router.get("/", authenticate, getMessages);

router.get("/:id", authenticate, getMessage);

router.patch("/:id/read", authenticate, markMessageAsRead);

router.delete("/:id", authenticate, deleteMessage);

export default router;