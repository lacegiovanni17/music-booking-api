import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/users/user.model"; // Import User model
import { UserRoles, UserStatus } from "../modules/users/user.enum" // Import UserStatus enum

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


export const authorizeRoles = (roles: UserRoles | UserRoles[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void | any => {
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Authentication required.",
      });
    }

    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    
    // ACTUAL ROLE CHECK WAS MISSING IN YOUR CODE
    if (requiredRoles.includes(req.user.user_role as UserRoles)) {
      return next(); // User has required role
    }
    
    // If we get here, user doesn't have required role
    res.status(403).json({
      success: false,
      message: "Forbidden. You do not have permission.",
    });
  };
};
