import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import HttpException from "../../utils/exceptions/http.exception";

// Register a new user
export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await authService.registerUser(req.body);
    res.json(newUser);
  } catch (error:any) {
    next(new HttpException(error?.status, error.message));
  }
}

// Login user
export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status, error.message));
  }
}
