import bcrypt from "bcryptjs";
import {IGenericResponseModel} from "../interfaces/generic_response.interface";
import dotenv from "dotenv";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Types} from "mongoose";

dotenv.config();

class UtilService {
  // API response helpers
  public buildApiResponse<T>(
    genericResponse: IGenericResponseModel<T>
  ): IGenericResponseModel<T> {
    genericResponse.success = true;
    if (!genericResponse.statusCode) {
      genericResponse.statusCode = 200;
    }
    return genericResponse;
  }

  public buildApiErrorResponse<T>(
    genericResponse: IGenericResponseModel<T>
  ): IGenericResponseModel<T> {
    genericResponse.success = false;
    if (!genericResponse.statusCode) {
      genericResponse.statusCode = 407;
    }
    return genericResponse;
  }

  // Generate random 6 digits
  public generateRandom6digits(): number {
    const min = 100000;
    const max = 999900;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Password-related utilities
  public comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  public hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  // Validate password strength
  public validatePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  }

 public generateToken(user_id: Types.ObjectId, email: string, user_role: string) {
    const token = jwt.sign(
        { user_id, email, user_role }, // Include user_role in the token
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );

    return {
        token,
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expiration in ISO format
    };
    }

}

export default UtilService;
