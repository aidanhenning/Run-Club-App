import express from "express";
const router = express.Router();

import {
  createPostLike,
  getPostLikesByPostId,
  removePostLike,
} from "../models/postLikes.js";
import requireUser from "../middleware/requireUser.js";

router.get("/:postId", requireUser, async (req, res) => {
  try {
    const likes = await getPostLikesByPostId(req.params.postId);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
});

router.post("/:postId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const like = await createPostLike({ postId, userId });
    if (!like) {
      return res.status(403).json({
        error:
          "Unauthorized: You must be a member of the club to like this run.",
      });
    }
    res.status(201).json(like);
  } catch (err) {
    res.status(400).json({ error: "Already liked this post." });
  }
});

router.delete("/:postId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const deleted = await removePostLike(userId, postId);
    if (!deleted) {
      return res.status(404).json({ error: "Like not found." });
    }
    res.json({ message: "Post unliked." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

export default router;
