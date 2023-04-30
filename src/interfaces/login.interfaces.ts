import { z } from "zod";
import { usersLoginSchema } from "../schemas/schemas";
import { TUserCreate } from "./users.interfaces";

type TLoginPayload = z.infer<typeof usersLoginSchema>;
interface IUserResult extends TUserCreate {
  password: string;
}

export { TLoginPayload, IUserResult };
