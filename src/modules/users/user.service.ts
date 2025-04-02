import User from "./user.model";
import { IUser } from "./user.interface";
import { Types } from "mongoose";
import UtilService from "../../utils/services/utils.service";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";
import { UserRoles } from "./user.enum";

class UserService {
  private utilservice = new UtilService();

  // Get User's Profile
  public async getUserProfile(
    userId: string
  ): Promise<IGenericResponseModel<IUser> | Error> {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestsException("Invalid User ID format");
      }

      const user = await User.findById(userId)
        .select("+is_account_disabled")
        .populate({
          path: "preferences_id",
          model: "Preferences",
        })
        .populate("country")
        .populate("posts_id", "_id")
        .populate("forums_id", "_id")
        .lean();

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return this.utilservice.buildApiResponse({
        data: user,
        message: "User profile retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving user profile:", error);
      throw error;
    }
  }

  // Find user by email
  public async findByEmail(email: string): Promise<IGenericResponseModel<IUser | null>> {
    try {
      const user = await User.findOne({ email }).lean();

      return this.utilservice.buildApiResponse({
        data: user,
        message: user ? "User found." : "No user found with this email.",
        statusCode: user ? 200 : 404,
        success: !!user,
      });
    } catch (error) {
      console.error("An unknown error occurred.");
      throw new NotFoundException("No email found");
    }
  }

  // Get all users
  public async getAllUsers(): Promise<IGenericResponseModel<IUser[]>> {
    try {
      const users = await User.find().lean();

      return this.utilservice.buildApiResponse({
        data: users,
        message: "Users retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Get all Artistes
  public async getAllArtistes(): Promise<IGenericResponseModel<IUser[]>> {
    try {
      const artistes = await User.find({ user_role: { $in: ["ARTIST", UserRoles.ARTIST] } }).lean();

      return this.utilservice.buildApiResponse({
        data: artistes,
        message: "Artistes retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching artistes:", error);
      throw error;
    }
  }

  // Get all Organisers
  public async getAllOrganisers(): Promise<IGenericResponseModel<IUser[]>> {
    try {
      const organisers = await User.find({ user_role: { $in: ["ORGANISER", UserRoles.ORGANIZER] } }).lean();

      return this.utilservice.buildApiResponse({
        data: organisers,
        message: "Organisers retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching organisers:", error);
      throw error;
    }
  }

  // Update User Profile
  public async updateUserProfile(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IGenericResponseModel<IUser | null>> {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).lean();

      if (!updatedUser) {
        throw new NotFoundException("User not found");
      }

      return this.utilservice.buildApiResponse({
        data: updatedUser,
        message: "User profile updated successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // Total Artistes Count
  public async totalArtistesCount(): Promise<IGenericResponseModel<number>> {
    try {
      const count = await User.countDocuments({ UserRole: { $in: ["ARTIST", UserRoles.ARTIST] } });

      return this.utilservice.buildApiResponse({
        data: count,
        message: "Total number of artistes retrieved.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error counting artistes:", error);
      throw error;
    }
  }

  // Total Organisers Count
  public async totalOrganisersCount(): Promise<IGenericResponseModel<number>> {
    try {
      const count = await User.countDocuments({ UserRole: { $in: ["ORGANISER", UserRoles.ORGANIZER] } });

      return this.utilservice.buildApiResponse({
        data: count,
        message: "Total number of organisers retrieved.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error counting organisers:", error);
      throw error;
    }
  }

  // Total Users Count
  public async totalUsersCount(): Promise<IGenericResponseModel<number>> {
    try {
      const count = await User.countDocuments();

      return this.utilservice.buildApiResponse({
        data: count,
        message: "Total number of users retrieved.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
