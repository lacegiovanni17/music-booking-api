//interface for user model
import { UserRoles, UserStatus } from "./user.enum";

export interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  user_role: UserRoles;
  user_status?: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
