import { Router } from "express";
import { createUser } from "../controllers/users.controller";
import verifyingEmailExists from "../middlewares/ensureVerifyEmailExists.middlewares";
import verifyingPayload from "../middlewares/ensureBodyIsValid.middlewares";
import { usersCreateSchema } from "../schemas/users.schemas";

const usersRouter = Router();

usersRouter.post(
  "",
  verifyingPayload(usersCreateSchema),
  verifyingEmailExists,
  createUser
);
usersRouter.get("");
usersRouter.get("/profile");
usersRouter.patch("/:id");
usersRouter.delete("/:id");
usersRouter.put("/:id/recover");

export { usersRouter };
