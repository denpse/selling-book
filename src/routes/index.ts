import { Router } from "express";
import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";
import bookRoute from "./bookRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/book", bookRoute);
export default router;
