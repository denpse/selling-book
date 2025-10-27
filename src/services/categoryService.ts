import categoryModel from "@/models/categoryModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, desc } = req.body;
    const userId = req.user?.userId;
    console.log("userId", userId);
    const existNameOfCat = await categoryModel.findOne({ name });
    if (existNameOfCat) {
      return res.status(401).json({
        message: "Category name is already exist!",
      });
    }
    const newCat = new categoryModel({
      name,
      desc,
      userId,
    });
    await newCat.save();
    res.status(201).json({
      data: newCat,
      message: "Category Created Successfully!",
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
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
    console.log("work");
    const { name, desc } = req.body;
    const userId = req.user?.userId;
    const categoryId = req.params.id;
    const updatedCat = await categoryModel.findByIdAndUpdate(
      { _id: categoryId },
      {
        name,
        desc,
        userId,
      },
      { new: true }
    );
    res.status(201).json({
      data: updatedCat,
      message: "update successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel
      .findById({ _id: categoryId })
      .populate("userId");
    res.status(200).json({
      data: category,
      message: "Get Categories successfully",
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
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }
    const existCategoryId = categoryModel.findById(id);
    if (!existCategoryId) {
      return res.status(401).json({ message: "Category not found" });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
