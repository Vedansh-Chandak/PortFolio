import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import experienceRoutes from "./experience.routes.js";
import projectRoutes from "./project.routes.js";
import techStackRoutes from "./techStack.routes.js";
import messageRoutes from "./message.routes.js";
import uploadRoutes from "./upload.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import settingsRoutes from "./settings.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/experience", experienceRoutes);
router.use("/projects", projectRoutes);
router.use("/tech-stack", techStackRoutes);
router.use("/messages", messageRoutes);
router.use("/uploads", uploadRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/settings", settingsRoutes);


export default router;