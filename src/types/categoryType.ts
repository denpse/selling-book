import { Document } from "mongoose";
export interface ICategory {
  name: string;
  desc: string;
  userId: string | Object;
}
