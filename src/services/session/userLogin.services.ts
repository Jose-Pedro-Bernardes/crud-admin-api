import format from "pg-format";
import { client } from "../../database";
import { IUserResult, TLoginPayload } from "../../interfaces/login.interfaces";
import { usersLoginSchema } from "../../schemas/schemas";
import { AppError } from "../../error";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { QueryResult } from "pg";

const userLoginService = async (payload: TLoginPayload) => {
  const login = usersLoginSchema.parse(payload);

  const queryString = format(
    `
  SELECT * FROM users WHERE email = %L;

  `,
    login.email
  );
  const queryResult: QueryResult<IUserResult> = await client.query(queryString);
  const user = queryResult.rows[0];

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const validatePassword = compareSync(login.password, user.password);
  if (!validatePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const userToken = sign(
    { email: user.email, admin: user.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: process.env.EXPIRES_IN, subject: String(user.id) }
  );

  return userToken;
};

export default userLoginService;
