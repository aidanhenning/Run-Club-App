import express from "express";
const router = express.Router();

import {
  createPostComment,
  getPostCommentsByPostId,
  updatePostCommentById,
  removePostComment,
} from "../db/queries/post_comments.js";
import requireUser from "../middleware/requireUser.js";

router.get("/:postId", requireUser, async (req, res) => {
  try {
    const comments = await getPostCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", requireUser, async (req, res) => {
  try {
    const { postId, content } = req.body;
    const comment = await createPostComment({
      postId,
      userId: req.user.id,
      content,
    });
    if (!comment) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You must be a member to comment." });
    }
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Comment failed" });
  }
});

router.put("/:id", requireUser, async (req, res) => {
  try {
    const updated = await updatePostCommentById(
      req.params.id,
      req.user.id,
      req.body.content,
    );
    if (!updated) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only edit your own comments." });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const deleted = await removePostComment(req.params.id, req.user.id);
    if (!deleted) {
      return res
        .status(403)
        .json({ error: "Unauthorized or comment not found." });
    }
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
