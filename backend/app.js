import "dotenv/config";
import cors from "cors";
import express from "express";
const app = express();

import usersRouter from "./routes/users.js";
import clubsRouter from "./routes/clubs.js";
import clubMembershipsRouter from "./routes/club_memberships.js";
import followersRouter from "./routes/followers.js";
import feedRouter from "./routes/feed.js";
import postsRouter from "./routes/posts.js";
import postPicturesRouter from "./routes/post_pictures.js";
import postAttendeesRouter from "./routes/post_attendees.js";
import postCommentsRouter from "./routes/post_comments.js";
import postLikesRouter from "./routes/post_likes.js";
import commentLikesRouter from "./routes/comment_likes.js";

import getUserFromToken from "./middleware/getUserFromToken.js";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(getUserFromToken);

// Base Resources
app.use("/users", usersRouter);
app.use("/clubs", clubsRouter);
app.use("/clubmemberships", clubMembershipsRouter);
app.use("/followers", followersRouter);

// Feed & Posts
app.use("/feed", feedRouter);
app.use("/posts", postsRouter);

// Post Interactions
app.use("/post-pictures", postPicturesRouter);
app.use("/post-attendees", postAttendeesRouter);
app.use("/post-comments", postCommentsRouter);
app.use("/post-likes", postLikesRouter);

// Comment Interactions
app.use("/comment-likes", commentLikesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the runclub API!");
});

export default app;
