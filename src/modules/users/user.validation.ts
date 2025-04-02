import Joi from "joi";
import { UserRoles, UserStatus } from "./user.enum"; // Import enums for validation

export const updateUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).optional(),
  last_name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  phone_number: Joi.string()
      .pattern(/^[+]?[\d\s()-]{7,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid phone number format",
        "string.empty": "Phone number is required",
      }),
  user_role: Joi.string()
    .valid(...Object.values(UserRoles))
    .optional(),
  user_status: Joi.string()
    .valid(...Object.values(UserStatus))
    .optional(),
  password: Joi.string().min(6).max(50).optional(),
});
