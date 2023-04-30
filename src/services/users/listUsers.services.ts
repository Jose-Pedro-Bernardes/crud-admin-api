import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { TUserRequest } from "../../interfaces/users.interfaces";
import format from "pg-format";

const listUsersService = async (payload: any): Promise<TUserRequest[]> => {
  if (!payload.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryString = format(
    `SELECT id, name, email, admin, active FROM users`
  );

  const response: QueryResult<TUserRequest> = await client.query(queryString);
  const listUser = response.rows;

  return listUser;
};

export default listUsersService;
