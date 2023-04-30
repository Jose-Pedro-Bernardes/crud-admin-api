import { Router } from "express";
import {
  createUser,
  getUser,
  listUsers,
  softDeleteUser,
  updateUser,
  userRecover,
} from "../controllers/users.controller";
import { verifyingEmailExists } from "../middlewares/ensureVerifyEmailExists.middlewares";
import verifyingPayload from "../middlewares/ensureBodyIsValid.middlewares";
import { usersCreateSchema } from "../schemas/schemas";
import verifyingUserToken from "../middlewares/ensureVerifyUserToken.middleware";
import verifyingUserExists from "../middlewares/ensureVerifyUserExists.middlewares";
import verifyingIsActive from "../middlewares/ensureIsActive.middlewares";
import verifyingAdminIsTrue from "../middlewares/ensureVerifyAdminIsTrue.middleware";

const usersRouter = Router();

usersRouter.post(
  "",
  verifyingPayload(usersCreateSchema),
  verifyingEmailExists,
  createUser
);
usersRouter.get("", verifyingUserToken, listUsers);
usersRouter.get("/profile", verifyingUserToken, getUser);
usersRouter.patch("/:id", verifyingUserExists, verifyingUserToken, updateUser);

usersRouter.delete(
  "/:id",
  verifyingUserExists,
  verifyingUserToken,
  softDeleteUser
);

usersRouter.put(
  "/:id/recover",
  verifyingUserToken,
  verifyingUserExists,
  verifyingAdminIsTrue,
  verifyingIsActive,
  userRecover
);

export { usersRouter };
