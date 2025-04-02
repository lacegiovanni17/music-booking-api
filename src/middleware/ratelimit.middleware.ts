import { globalLimiter, authLimiter, bookingLimiter } from "../config/ratelimit";
import { Request, Response, NextFunction } from "express";

// Middleware function to apply global rate limiting
export const applyGlobalRateLimit = (req: Request, res: Response, next: NextFunction) => {
  globalLimiter(req, res, next);
};

// Middleware function to apply authentication rate limiting
export const applyAuthRateLimit = (req: Request, res: Response, next: NextFunction) => {
  authLimiter(req, res, next);
};

// Middleware function to apply booking rate limiting
export const applyBookingRateLimit = (req: Request, res: Response, next: NextFunction) => {
  bookingLimiter(req, res, next);
};
