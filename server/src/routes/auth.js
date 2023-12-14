import { Router } from "express";
import { authGetUrlRequest, authSignWithGoogle } from "../controllers/oauth.js";
import { loginUser, registerUser } from "../controllers/auth.js";
import { valLogin, valRegister } from "../middlewares/validation.js";

const router = Router();

// oauth
router.post("/request", authGetUrlRequest);
router.get("/google", authSignWithGoogle);

// auth
router.post("/register", valRegister, registerUser);
router.post("/login", valLogin, loginUser);

export default router;
