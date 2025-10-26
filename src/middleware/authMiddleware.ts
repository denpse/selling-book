import userModel from "@/models/userModel";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as JwtPayload;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roles;
    if (
      !userRole ||
      !userRole.some((role: string) => allowedRoles.includes(role))
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
