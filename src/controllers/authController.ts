import { LoginService, registerService } from "@/services/authService";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req, res);
  return res.json(result);
};

export const loginController = async (req: Request, res: Response) => {
  const result = await LoginService(req, res);
  return res.json(result);
};
