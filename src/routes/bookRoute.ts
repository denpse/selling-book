import {
  createBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
} from "@/controllers/bookController";
import { authenticate, authorize } from "@/middleware/authMiddleware";
import { Router } from "express";
const router = Router();

router.post(
  "/create-book",
  authenticate,
  authorize(["admin"]),
  createBookController
);
router.put(
  "/update-book/:id",
  authenticate,
  authorize(["admin"]),
  updateBookController
);
router.get(
  "/get-books",
  authenticate,
  authorize(["admin", "user"]),
  getAllBookController
);
router.get("/:id", authenticate, authorize(["admin"]), getBookByIdController);
export default router;
