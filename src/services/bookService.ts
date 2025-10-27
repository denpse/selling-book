import bookModel from "@/models/bookModel";
import { Request, Response } from "express";
export const createBookService = async (req: Request, res: Response) => {
  try {
    const {
      imageUrl,
      title,
      desc,
      author,
      price,
      stock,
      category,
      publishYear,
    } = req.body;
    const userId = req.user?.userId;
    const newBook = new bookModel({
      imageUrl,
      title,
      desc,
      author,
      price,
      stock,
      category,
      publishYear,
      publisher: userId,
    });
    if (stock <= 0 || price <= 0) {
      return res.status(400).json({ message: "price and stock can not 0" });
    }
    await newBook.save();
    res.status(201).json({
      data: newBook,
      message: "Created Book Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      imageUrl,
      title,
      desc,
      author,
      price,
      stock,
      category,
      publishYear,
    } = req.body;
    const userId = req.user?.userId;
    const newBook = await bookModel.findByIdAndUpdate(
      { _id: id },
      {
        imageUrl,
        title,
        desc,
        author,
        price,
        stock,
        category,
        publishYear,
        publisher: userId,
      },
      { new: true }
    );
    if (stock <= 0 || price <= 0) {
      return res.status(400).json({ message: "price and stock can not 0" });
    }
    res.status(201).json({
      data: newBook,
      message: "Update Book Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookByIdService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await bookModel
      .findById(id)
      .populate("publisher")
      .populate("category");
    res.status(200).json({
      data: book,
      message: "get book successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBooksService = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const search = req.query.search as string;
    // const category = req.query.category as string;
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const books = await bookModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("publisher")
      .populate("category");

    const total = await bookModel.countDocuments(query);
    res.status(200).json({
      data: books,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      message: "get all books successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
