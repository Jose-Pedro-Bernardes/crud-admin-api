import { Request, Response } from "express";
import { adminVerify } from "./updateUser.services";
import format from "pg-format";
import { client } from "../../database";
import { QueryResult } from "pg";
import { IUserResult } from "../../interfaces/login.interfaces";
import { AppError } from "../../error";
import { IUserAdmin } from "../../interfaces/users.interfaces";

const deleteUserService = async (
  id: string,
  user: IUserAdmin,
  isAdmin: boolean
): Promise<void> => {
  adminVerify(isAdmin, user.admin);

  const queryString: string = format(
    `
  UPDATE users SET active = false WHERE id = %L AND active = true
  RETURNING *;
  `,
    id
  );

  const queryResult: QueryResult<IUserResult> = await client.query(queryString);
  const userRes = queryResult.rows[0];

  if (!userRes) {
    throw new AppError("User already deactivated", 409);
  }
};

export default deleteUserService;
