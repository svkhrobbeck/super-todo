import { Router } from "express";
import { authGetUrlRequest, authSignWithGoogle } from "../controllers/oauth.js";

const router = Router();

// oauth
router.post("/request", authGetUrlRequest);
router.get("/google", authSignWithGoogle);

export default router;
