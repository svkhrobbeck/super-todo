import { Router } from "express";
import { getUserProfile } from "../controllers/user.js";

const router = Router();

router.get("/profile", getUserProfile);

export default router;
