import categoryModel from "@/models/categoryModel";
import { Request, Response } from "express";

export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, desc } = req.body;
    const userId = req.user?.userId;
    const existCategoryName = await categoryModel.findOne({ name });
    if (existCategoryName) {
      return res
        .status(401)
        .json({ message: "This category name is already exist!" });
    }
    const newCategory = new categoryModel({
      name,
      desc,
      userId,
    });
    await newCategory.save();
    res.status(201).json({
      data: newCategory,
      message: "Create category successfully!",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategoriesService = async (req: Request, res: Response) => {
  try {
    const allCategories = await categoryModel.find().populate("userId");
    res.status(200).json({
      data: allCategories,
      message: "Get Categories successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategoryService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { name, desc } = req.body;
    const userId = req.user?.userId;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: categoryId },
      {
        name,
        desc,
        userId,
      },
      { new: true }
    );
    res.status(201).json({
      data: updatedCategory,
      message: "this category updated Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryByIdService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    console.log("category", categoryId);
    const category = await categoryModel
      .findById({ _id: categoryId })
      .populate("userId");
    res.status(200).json({
      data: category,
      message: "get category Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategoryService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    await categoryModel.findByIdAndDelete({ _id: categoryId });
    res.status(201).json({
      message: "category deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
