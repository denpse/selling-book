import { Document } from "mongoose";

export default interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  roles: String;
  createdAt: Date;
  updatedAt: Date;
}
