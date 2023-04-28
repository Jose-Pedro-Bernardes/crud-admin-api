import { Router } from "express";

const usersRouter = Router();

usersRouter.post("");
usersRouter.get("");
usersRouter.get("/profile");
usersRouter.patch("/:id");
usersRouter.delete("/:id");
usersRouter.put("/:id/recover");

export { usersRouter };
