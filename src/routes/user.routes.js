import { Router } from "express";
import { loginUser, registerUser,forgotUser} from "../controllers/user.controller.js";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot").post(forgotUser)

export default router