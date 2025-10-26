import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryController,
  updateCategoryController,
} from "@/controllers/categoryController";
import { authenticate, authorize } from "@/middleware/authMiddlware";
import { Router } from "express";

const router = Router();

router.post(
  "/create-category",
  authenticate,
  authorize(["admin"]),
  createCategoryController
);

router.get(
  "/categories",
  authenticate,
  authorize(["admin"]),
  getAllCategoriesController
);

router.put(
  "/update-category/:id",
  authenticate,
  authorize(["admin"]),
  updateCategoryController
);

router.get(
  "/category/:id",
  authenticate,
  authorize(["admin"]),
  getCategoryController
);
router.delete(
  "/delete-category/:id",
  authenticate,
  authorize(["admin"]),
  deleteCategoryController
);
export default router;
