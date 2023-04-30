import { z } from "zod";
import { usersCreateSchema, usersInfoSchema } from "../schemas/schemas";

type TUserCreate = z.infer<typeof usersInfoSchema>;
type TUserRequest = z.infer<typeof usersCreateSchema>;

interface IUserAdmin {
  id: number;
  email: string;
  admin: boolean;
}

export { TUserCreate, TUserRequest, IUserAdmin };
