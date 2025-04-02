import { Router } from "express";
import {
  getUserProfile,
  findUserByEmail,
  getAllUsers,
  getAllArtistes,
  getAllOrganisers,
  updateUserProfile,
  totalArtistesCount,
  totalOrganisersCount,
  totalUsersCount,
} from "./user.controller";
import { authenticateUser } from "../../middleware/auth.middleware";
import validationMiddleware from "../../middleware/validation.middleware";
import { updateUserSchema } from "./user.validation";

const userRouter = Router();

userRouter.get("/profile/:userId", authenticateUser, getUserProfile);

userRouter.get("/find-by-email", authenticateUser, findUserByEmail);

userRouter.get("/all-users", authenticateUser, getAllUsers);

userRouter.get("/artistes", authenticateUser, getAllArtistes);

userRouter.get("/organisers", authenticateUser, getAllOrganisers);

userRouter.put("/update/:userId", authenticateUser, validationMiddleware(updateUserSchema), updateUserProfile);

userRouter.get("/count/artists", authenticateUser, totalArtistesCount);
userRouter.get("/count/organizers", authenticateUser, totalOrganisersCount);
userRouter.get("/count/users", authenticateUser, totalUsersCount);

export default userRouter;
