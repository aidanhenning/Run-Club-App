import "dotenv/config";
import express from "express";
const app = express();

import usersRouter from "./routes/users.js";

app.use(express.json());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the runclub API!");
});

export default app;
