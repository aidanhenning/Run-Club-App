import express from "express";
const router = express.Router();

import { getFeed } from "../db/queries/getFeed.js";
import requireUser from "../middleware/requireUser.js";

router.get("/", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await getFeed(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

export default router;
