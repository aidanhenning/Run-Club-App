import express from "express";
const app = express();
export default app;

import usersRouter from "./routes/users.js";

app.use(express.json());

app.use("/users", usersRouter);
