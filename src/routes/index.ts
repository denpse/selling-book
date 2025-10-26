import { Router } from "express";
import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/categories", categoryRoute);

export default router;
