import express from "express";
const router = express.Router();

import {
  createCommentLike,
  getCommentLikesByCommentId,
  removeCommentLike,
} from "../db/queries/comment_likes.js";
import requireUser from "../middleware/requireUser.js";

router.get("/:commentId", requireUser, async (req, res) => {
  try {
    const likes = await getCommentLikesByCommentId(req.params.commentId);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
});

router.post("/:commentId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const like = await createCommentLike({ commentId, userId });
    if (!like) {
      return res.status(403).json({
        error:
          "Unauthorized: You must be a member of the club to like this comment.",
      });
    }
    res.status(201).json(like);
  } catch (err) {
    res.status(400).json({ error: "Already liked or comment does not exist." });
  }
});

router.delete("/:commentId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const deleted = await removeCommentLike(userId, commentId);
    if (!deleted) {
      return res.status(404).json({ error: "Like not found." });
    }
    res.json({ message: "Comment unliked." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove like." });
  }
});

export default router;
