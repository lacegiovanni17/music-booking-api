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

const router = Router();

router.get("/profile/:userId", getUserProfile);
router.get("/find", findUserByEmail);
router.get("/all", getAllUsers);
router.get("/artistes", getAllArtistes);
router.get("/organisers", getAllOrganisers);
router.put("/update/:userId", updateUserProfile);
router.get("/count/artistes", totalArtistesCount);
router.get("/count/organisers", totalOrganisersCount);
router.get("/count/users", totalUsersCount);

export default router;
