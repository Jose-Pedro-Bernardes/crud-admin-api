import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import format from "pg-format";

const verifyingIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = parseInt(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM users WHERE id = %L;        
   `,
    userId
  );

  const queryResult = await client.query(queryString);
  const user = queryResult.rows[0];

  if (user.active === true) {
    throw new AppError("User already active", 400);
  }

  return next();
};

export default verifyingIsActive;
