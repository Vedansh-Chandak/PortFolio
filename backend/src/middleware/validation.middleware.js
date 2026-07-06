import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new ApiError(400, "Validation failed", errors)
      );
    }

    // Replace request body with validated & parsed data
    req.body = result.data;

    next();
  };
};

export default validate;