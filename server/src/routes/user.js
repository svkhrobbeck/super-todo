import { Router } from "express";
import {
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../controllers/user.js";
import {
  valSetPassword,
  valUpdatePassword,
  valUserUpdate,
} from "../middlewares/validation.js";

const router = Router();

router
  .route("/profile")
  .get(getUserProfile)
  .patch(valUserUpdate, updateUserProfile);

router.patch("/profile/update-password", valUpdatePassword, updatePassword);
router.patch("/profile/set-password", valSetPassword, updatePassword);

export default router;
