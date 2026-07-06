import "./config/database.js";

import app from "./app.js";
import { env } from "./config/env.js";
import { initializeDatabase } from "./database/init.js";
import { getAllExperiences } from "./models/experience.model.js";
import { getAllProjects } from "./models/project.model.js";
import cloudinary from "./config/cloudinary.js";


initializeDatabase();
console.log(await cloudinary.api.ping());
app.listen(env.PORT, () => {
  console.log(`
==========================================
🚀 Server Running
==========================================
Environment : ${env.NODE_ENV}
Port        : ${env.PORT}
==========================================
`);
});