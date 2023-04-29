import express, { Application, json } from "express";
import { usersRouter } from "./routes/users.routes";
import { loginRouter } from "./routes/login.routes";
import { errorHandler } from "./error";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

export default app;
