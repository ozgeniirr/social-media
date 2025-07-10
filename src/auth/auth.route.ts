import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";

const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;