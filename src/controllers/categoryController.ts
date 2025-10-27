import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryService,
  updateCategoryService,
} from "@/services/categoryService";
import { Response, Request } from "express";

export const CreateCategoryController = async (req: Request, res: Response) => {
  const result = await createCategoryService(req, res);
  return result;
};
export const GetAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllCategoriesService(req, res);
  return result;
};
export const UpdateCategoryController = async (req: Request, res: Response) => {
  const result = await updateCategoryService(req, res);
  return result;
};
export const GetCategoryController = async (req: Request, res: Response) => {
  const result = await getCategoryService(req, res);
  return result;
};
export const DeleteCategoryController = async (req: Request, res: Response) => {
  const result = await deleteCategoryService(req, res);
  return result;
};
