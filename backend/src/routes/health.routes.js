import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", healthCheck);

router.get("/protected", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;