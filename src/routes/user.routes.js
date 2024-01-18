import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router=Router()

router.route("/api/v1/register").post(registerUser)
router.route("/api/v1/login").post(loginUser)

export default router