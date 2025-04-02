import User from "../users/user.model";
import { IUser } from "../users/user.interface";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { UserRoles } from "../users/user.enum";
import UtilService from "../../utils/services/utils.service";
import { Types } from "mongoose";
import { ILoginUserResponse } from "./auth.interface";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";

class AuthService {
  private utilservice = new UtilService();

  // Register a new user
public async registerUser(userData: Partial<IUser>) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return this.utilservice.buildApiErrorResponse({
        data: null,
        message: "User already exists with this email",
        statusCode: 400,
      });
    }

    // Hash password using UtilService
    userData.password = this.utilservice.hashPassword(userData.password as string);

    // Assign default role if not provided
    userData.user_role = userData.user_role || UserRoles.ARTIST;

    // Create and save new user
    const newUser = new User(userData);
    await newUser.save();

    return this.utilservice.buildApiResponse({
      data: newUser,
      message: "User registered successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
}


 public async loginUser(email: string, password: string): Promise<IGenericResponseModel<ILoginUserResponse>> {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new NotFoundException("Invalid email or password");
    }

    // Compare password using UtilService
    if (!this.utilservice.comparePassword(password, user.password)) {
      throw new BadRequestsException("Invalid email or password");
    }

    // Generate token using UtilService
    const { token, expiresIn } = this.utilservice.generateToken(new Types.ObjectId(user._id), user.email, user.user_role);

    return this.utilservice.buildApiResponse<ILoginUserResponse>({
        data: { token, expiresIn, user },  // Ensure expiresIn is explicitly included
        message: "Login successful",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        console.error("Error during user login:", error);
        throw error;
    }
    }

}

export const authService = new AuthService();
