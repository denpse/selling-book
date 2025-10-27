import {
  CreateCategoryController,
  DeleteCategoryController,
  GetAllCategoriesController,
  GetCategoryController,
  UpdateCategoryController,
} from "@/controllers/categoryController";
import { authenticate, authorize } from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.post(
  "/create-category",
  authenticate,
  authorize(["admin"]),
  CreateCategoryController
);
router.get(
  "/categories",
  authenticate,
  authorize(["admin"]),
  GetAllCategoriesController
);
router.put(
  "/update-category/:id",
  authenticate,
  authorize(["admin"]),
  UpdateCategoryController
);

router.get("/:id", authenticate, authorize(["admin"]), GetCategoryController);

router.delete(
  "/delete-category/:id",
  authenticate,
  authorize(["admin"]),
  DeleteCategoryController
);

export default router;
