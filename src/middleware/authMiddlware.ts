import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// authentication check token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
// role check
export const authorize = (allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles;
    if (
      !userRoles ||
      !userRoles.some((role: string) => allowedRole.includes(role))
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
