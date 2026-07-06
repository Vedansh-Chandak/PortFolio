import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";

// Routes
import routes from "./routes/index.js";

// Middleware
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import rateLimiter from "./middleware/rateLimiter.middleware.js";

const app = express();

function isAllowedDevOrigin(origin) {
  if (!origin) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);

    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/* ----------------------------- Security ----------------------------- */

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (env.NODE_ENV === "development" && isAllowedDevOrigin(origin)) {
        callback(null, true);
        return;
      }

      if (!origin || env.CORS_ORIGIN.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

/* ----------------------------- General ------------------------------ */

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.use(rateLimiter);

/* ------------------------------ Routes ------------------------------ */

app.use("/api/v1", routes);

/* -------------------------- Error Handling -------------------------- */

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;