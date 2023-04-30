import { z } from "zod";
import {
  usersCreateSchema,
  usersInfoSchema,
  usersUpdateSchema,
} from "../schemas/schemas";

type TUserCreate = z.infer<typeof usersInfoSchema>;
type TUserRequest = z.infer<typeof usersCreateSchema>;
type TUserUpdate = z.infer<typeof usersUpdateSchema>;

interface IUserAdmin {
  id: number;
  email: string;
  admin: boolean;
}

export { TUserCreate, TUserRequest, TUserUpdate, IUserAdmin };
