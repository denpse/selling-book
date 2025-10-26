import userModel from "@/models/userModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId: string, roles: string[]): string => {
  return jwt.sign({ userId, roles }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const registerService = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, age } = req.body;
    const existEmail = await userModel.findOne({ email });
    const existPhone = await userModel.findOne({ phone });
    if (existEmail) {
      res.status(400).json({ message: "Email already exist!" });
    }
    if (existPhone) {
      res.status(400).json({ message: "Phone already exist!" });
    }
    //bcrypt password
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phone,
      age,
    });
    await newUser.save();

    const token = generateToken(newUser._id, newUser.roles);

    res.status(201).json({
      data: newUser,
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const LoginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existEmail = await userModel.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({ message: "Email not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, existEmail.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password not correct" });
    }
    const token = generateToken(existEmail._id, existEmail.roles);

    res.status(200).json({
      data: existEmail,
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
