import { Request, Response } from "express";
import userLoginService from "../services/session/userLogin.services";
import { TLoginPayload } from "../interfaces/login.interfaces";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: TLoginPayload = req.body;
  const token: string = await userLoginService(payload);

  return res.status(200).json({ token: token });
};

export default loginUser;
