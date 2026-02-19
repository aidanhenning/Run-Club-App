import express from "express";
const router = express.Router();

import {
  createPost,
  getPostById,
  updatePostById,
  removePost,
} from "../db/queries/posts.js";
import requireUser from "../middleware/requireUser.js";

router.post("/", requireUser, async (req, res) => {
  try {
    const { clubId, ...postData } = req.body;
    const newPost = await createPost({
      userId: req.user.id,
      clubId,
      ...postData,
    });
    if (!newPost) {
      return res.status(403).json({
        error:
          "Unauthorized: You must be the club owner to create a post for this club.",
      });
    }
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.get("/:id", requireUser, async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.put("/:id", requireUser, async (req, res) => {
  try {
    const updatedPost = await updatePostById(
      req.params.id,
      req.user.id,
      req.body,
    );

    if (!updatedPost) {
      return res.status(403).json({
        error: "Unauthorized: You do not have permission to edit this post.",
      });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const deletedPost = await removePost(req.params.id, req.user.id);

    if (!deletedPost) {
      return res.status(403).json({
        error: "Unauthorized: You do not have permission to delete this post.",
      });
    }
    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
