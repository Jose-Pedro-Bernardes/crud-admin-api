import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

const verifyingUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const [, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      admin: decoded.admin,
    };
  });

  return next();
};

export default verifyingUserToken;
