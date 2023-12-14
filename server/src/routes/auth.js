import { Router } from "express";
import { authGetUrlRequest, authSignWithGoogle } from "../controllers/oauth.js";
import { loginUser, registerUser } from "../controllers/auth.js";

const router = Router();

// oauth
router.post("/request", authGetUrlRequest);
router.get("/google", authSignWithGoogle);

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
