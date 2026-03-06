import express from "express";
const router = express.Router();

import { getFeed } from "../db/queries/getFeed.js";
import requireUser from "../middleware/requireUser.js";

router.get("/", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    const posts = await getFeed(userId, limit, offset);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

export default router;
