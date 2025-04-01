import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { UserRoles, UserStatus } from "./user.enum";

// User Schema
const userSchema = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true, // Automatically generate _id if not provided
    },
    first_name: {
      type: String,
      required: true,
      select: true,
    },
    last_name: {
      type: String,
      required: true,
      select: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      select: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
      select: true,
    },
    user_role: {
      type: String,
      enum: Object.values(UserRoles),
      required: true,
    },
    user_status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.INACTIVE, // Default status
    },
  },
  {
    timestamps: true,
  }
);

// Create User model
const User = model<IUser>("User", userSchema);
export default User;
