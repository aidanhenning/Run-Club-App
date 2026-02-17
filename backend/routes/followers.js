import express from "express";
const router = express.Router();

import {
  createFollower,
  removeFollower,
  getFollowers,
  getFollowing,
} from "../db/queries/followers";
import requireUser from "../middleware/requireUser";

router.get("/followers", requireUser, async (req, res) => {
  try {
    const followers = await getFollowers(req.user.id);
    res.json(followers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch followers" });
  }
});

router.get("/following", requireUser, async (req, res) => {
  try {
    const following = await getFollowing(req.user.id);
    res.json(following);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch following list" });
  }
});

router.post("/:id", requireUser, async (req, res) => {
  try {
    const followerId = req.user.id;
    const followedId = req.params.id;
    if (followerId === followedId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }
    await createFollower(followerId, followedId);
    res.status(201).json({ success: true, message: "User followed" });
  } catch (err) {
    res.status(400).json({ error: "Already following or user not found" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const followerId = req.user.id;
    const followedId = req.params.id;
    await removeFollower(followerId, followedId);
    res.json({ success: true, message: "User unfollowed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
});

export default router;
