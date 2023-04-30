import { Router } from "express";
import verifyingPayload from "../middlewares/ensureBodyIsValid.middlewares";
import { usersLoginSchema } from "../schemas/schemas";
import loginUser from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.post("", verifyingPayload(usersLoginSchema), loginUser);

export { loginRouter };
