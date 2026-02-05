import "dotenv/config";
import express from "express";
const app = express();

import usersRouter from "./routes/users.js";

app.use(express.json());

app.use("/users", usersRouter);

export default app;
