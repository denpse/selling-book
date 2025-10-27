import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
} from "@/services/bookService";
import { Request, Response } from "express";

export const createBookController = async (req: Request, res: Response) => {
  const result = await createBookService(req, res);
  return result;
};
export const updateBookController = async (req: Request, res: Response) => {
  const result = await updateBookService(req, res);
  return result;
};
export const getBookByIdController = async (req: Request, res: Response) => {
  const result = await getBookByIdService(req, res);
  return result;
};

export const getAllBookController = async (req: Request, res: Response) => {
  const result = await getAllBooksService(req, res);
  return result;
};
