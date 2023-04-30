import format from "pg-format";
import { usersInfoSchema } from "../../schemas/schemas";
import { AppError } from "../../error";

import { client } from "../../database";
import {
  IUserAdmin,
  TUserCreate,
  TUserUpdate,
} from "../../interfaces/users.interfaces";

const updateUserService = async (
  payload: TUserUpdate,
  user: IUserAdmin,
  id: string,
  isAdmin: boolean
): Promise<TUserCreate | void> => {
  adminVerify(isAdmin, user.admin);

  const keys = Object.keys(payload);
  const values = Object.values(payload);

  const queryString = format(
    `
  UPDATE users SET (%I) = ROW(%L) WHERE id = %L RETURNING *;
  `,
    keys,
    values,
    id
  );

  const queryResult = await client.query(queryString);
  const userRes = usersInfoSchema.parse(queryResult.rows[0]);

  return userRes;
};

export const adminVerify = (userAdmin: boolean, isAdmin: boolean) => {
  if (userAdmin && !isAdmin) {
    throw new AppError("Insufficient Permission", 403);
  }
};

export default updateUserService;
