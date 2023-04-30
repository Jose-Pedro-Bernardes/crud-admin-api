import { Router } from "express";
import { createUser, listUsers } from "../controllers/users.controller";
import { verifyingEmailExists } from "../middlewares/ensureVerifyEmailExists.middlewares";
import verifyingPayload from "../middlewares/ensureBodyIsValid.middlewares";
import { usersCreateSchema } from "../schemas/schemas";
import verifyingUserToken from "../middlewares/ensureVerifyUserToken.middleware";

const usersRouter = Router();

usersRouter.post(
  "",
  verifyingPayload(usersCreateSchema),
  verifyingEmailExists,
  createUser
);
usersRouter.get("", verifyingUserToken, listUsers);
usersRouter.get("/profile");
usersRouter.patch("/:id");
usersRouter.delete("/:id");
usersRouter.put("/:id/recover");

export { usersRouter };
