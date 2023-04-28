import express, { Application, json } from "express";
import { usersRouter } from "./routers/users.router";
import { loginRouter } from "./routers/login.router";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);

export default app;
