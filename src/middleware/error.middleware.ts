
// error.middleware.ts
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error:", err.message || err);

  const statusCode = err.status || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Show stack trace only in development mode
  };

  return res.status(statusCode).json(response);
};
