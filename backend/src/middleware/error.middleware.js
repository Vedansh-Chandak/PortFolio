import { env } from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  };

  if (env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorMiddleware;