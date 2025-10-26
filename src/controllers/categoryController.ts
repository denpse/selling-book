import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "@/services/categoryService";
import { Request, Response } from "express";

export const createCategoryController = async (req: Request, res: Response) => {
  const result = await createCategoryService(req, res);
  return result;
};
export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllCategoriesService(req, res);
  return result;
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const result = await updateCategoryService(req, res);
  return result;
};
export const getCategoryController = async (req: Request, res: Response) => {
  const result = await getCategoryByIdService(req, res);
  return result;
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  const result = await deleteCategoryService(req, res);
  return result;
};
