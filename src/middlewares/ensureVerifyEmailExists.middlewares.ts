import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../error";

const verifyingEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const payload = req.body;

  const queryString = format(
    `
    SELECT * FROM users WHERE email = %L;
    `,
    payload.email
  );

  const queryResult = await client.query(queryString);

  if (queryResult.rows[0]) {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};

export default verifyingEmailExists;
