import express from "express";
const router = express.Router();

import {
  createPostPicture,
  getPostPicturesByPostId,
  removePostPicture,
} from "../models/postPictures.js";
import requireUser from "../middleware/requireUser.js";

router.get("/:postId", requireUser, async (req, res) => {
  try {
    const pictures = await getPostPicturesByPostId(req.params.postId);
    res.json(pictures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pictures" });
  }
});

router.post("/", requireUser, async (req, res) => {
  try {
    const { postId, imageUrl } = req.body;
    const userId = req.user.id;
    const picture = await createPostPicture({
      postId,
      userId,
      imageUrl,
    });
    if (!picture) {
      return res.status(403).json({
        error:
          "Unauthorized: You must be a member of the club to post pictures to this run.",
      });
    }
    res.status(201).json(picture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const deleted = await removePostPicture(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(403).json({
        error: "Unauthorized: You can only delete photos you uploaded.",
      });
    }
    res.json({ message: "Picture removed" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
