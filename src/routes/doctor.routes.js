import { Router } from "express";
import { registerDoctor,loginDoctor } from "../controllers/doctor.controller.js";

const router=Router();

router.route("/register").post(registerDoctor);
router.route("/login").post(loginDoctor);

export default router;