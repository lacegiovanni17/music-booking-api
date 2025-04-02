import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/users/user.model"; // Import User model
import { UserStatus } from "../modules/users/user.enum" // Import UserStatus enum

type AuthUser = { user_id: string; email: string; user_role: string };

interface AuthRequest extends Request {
  user?: AuthUser;
}

// Authentication Middleware
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from `Bearer <token>`

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized. No authentication token found." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
    req.user = decoded; // Attach user details

    // Ensure user exists before updating status (Non-blocking DB update)
    User.findByIdAndUpdate(decoded.user_id, { user_status: UserStatus.ACTIVE }).exec();

    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Forbidden. Token is invalid or expired." });
  }
};


// Authorization Middleware - Restricts access based on user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.user_role)) {
      return res.status(403).json({ success: false, message: "Forbidden. You do not have permission." });
    }
    next();
  };
};
