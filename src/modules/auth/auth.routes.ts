import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";
import validationMiddleware from "../../middleware/validation.middleware";
import { loginValidationSchema, registerValidationSchema } from "./auth.validation";
import { applyAuthRateLimit } from "../../middleware/ratelimit.middleware";

const authRoutes = Router();

authRoutes.post("/register", validationMiddleware(registerValidationSchema), registerUser);
authRoutes.post("/login", applyAuthRateLimit, validationMiddleware(loginValidationSchema), loginUser);

export default authRoutes;
