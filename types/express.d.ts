import { UserRoles } from "../src/modules/users/user.enum";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        email: string;
        user_role: UserRoles;
      };
    }
  }
}
