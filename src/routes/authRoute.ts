import {
  loginController,
  registerController,
} from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
