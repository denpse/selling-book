import { Document } from "mongoose";
export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  desc: string;
  stock: number;
  category: string | object;
  publisher: string | object;
  imageUrl: string;
  publishYear: string;
  cratedAt: Date;
  updatedAt: Date;
}
