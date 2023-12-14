import { Router } from "express";
import { authGetUrlRequest, authSignWithGoogle } from "../controllers/auth.js";

const router = Router();

router.post("/request", authGetUrlRequest);
router.get("/google", authSignWithGoogle);

export default router;
