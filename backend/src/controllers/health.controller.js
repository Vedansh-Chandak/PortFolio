export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    },
  });
};