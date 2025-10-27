import { Router } from "express";
import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
export default router;
