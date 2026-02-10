import "dotenv/config";
import express from "express";
const app = express();

import usersRouter from "./routes/users.js";
import clubsRouter from "./routes/clubs.js";
import feedRouter from "./routes/feed.js";
import searchRouter from "./routes/search.js";
import getUserFromToken from "./middleware/getUserFromToken.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/clubs", clubsRouter);
app.use("/feed", feedRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the runclub API!");
});

export default app;
