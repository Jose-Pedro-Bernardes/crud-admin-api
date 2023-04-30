import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../error";
import { QueryResult } from "pg";
import { IUserResult } from "../interfaces/login.interfaces";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id || req.body.userId;

  const queryString: string = format(
    `
  SELECT * FROM users WHERE id = %L;
  `,
    id
  );

  const queryResult: QueryResult<IUserResult> = await client.query(queryString);
  const user = queryResult.rows[0];

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.locals.userExist = user;

  return next();
};
