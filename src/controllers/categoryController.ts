import { createCategoryService } from "@/services/categoryService";
import { Request, Response } from "express";
export const createCategoryController = async (req: Request, res: Response) => {
  const result = createCategoryService(req, res);
  return result;
};
