import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyingAdminIsTrue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userAdmin = res.locals.user;

  if (userAdmin.admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default verifyingAdminIsTrue;
