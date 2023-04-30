import format from "pg-format";
import { TUserCreate } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { usersInfoSchema } from "../../schemas/schemas";
import { QueryResult } from "pg";
import { IUserResult } from "../../interfaces/login.interfaces";
import { AppError } from "../../error";

export const getUserService = async (
  payload: TUserCreate
): Promise<TUserCreate> => {
  const queryString: string = format(
    `
  SELECT *
  FROM users
  WHERE id = %L;
  `,
    payload.id
  );

  const queryResult: QueryResult<IUserResult> = await client.query(queryString);
  const user = usersInfoSchema.parse(queryResult.rows[0]);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default getUserService;
