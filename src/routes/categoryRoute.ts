import { createCategoryController } from "@/controllers/categoryController";
import { authenticate, authorize } from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.post(
  "/create-category",
  authenticate,
  authorize(["user", "admin"]),
  createCategoryController
);

export default router;
