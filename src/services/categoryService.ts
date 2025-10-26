import { Request, Response } from "express";

export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;
    console.log("User ID:", userId);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
