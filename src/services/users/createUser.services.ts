import { TUserRequest } from "../../interfaces/users.interfaces";
import { hashSync } from "bcryptjs";
import format from "pg-format";
import { client } from "../../database";
import { usersInfoSchema } from "../../schemas/schemas";
import { QueryResult } from "pg";
import { TUserCreate } from "../../interfaces/users.interfaces";

const createUserService = async (
  payload: TUserRequest
): Promise<TUserCreate> => {
  payload.password = hashSync(payload.password, 10);
  if (!payload.active) {
    payload.active = false;
  }

  const keys = Object.keys(payload);
  const values = Object.values(payload);
  const queryString: string = format(
    `
  INSERT INTO users (%I) VALUES (%L) RETURNING *;
  `,
    keys,
    values
  );

  const response: QueryResult<TUserRequest> = await client.query(queryString);
  const user = usersInfoSchema.parse(response.rows[0]);

  return user;
};

export default createUserService;
