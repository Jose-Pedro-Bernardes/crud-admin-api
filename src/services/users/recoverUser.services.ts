import { usersInfoSchema } from "../../schemas/schemas";
import { client } from "../../database";
import format from "pg-format";

const userRecoverService = async (userId: string) => {
  const id = parseInt(userId, 10);

  const queryString: string = format(
    `
    UPDATE users SET active = true WHERE id = %L AND active = false
    RETURNING *;     
    `,
    id
  );

  const queryResult = await client.query(queryString);
  const user = usersInfoSchema.parse(queryResult.rows[0]);

  return user;
};

export default userRecoverService;
