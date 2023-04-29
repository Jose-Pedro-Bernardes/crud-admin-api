import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  return res.status(201).json();
};
