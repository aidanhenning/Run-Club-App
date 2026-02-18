import express from "express";
const router = express.Router();

import {
  createPostAttendee,
  getPostAttendeesByPostId,
  removePostAttendee,
} from "../models/postAttendees.js";
import requireUser from "../middleware/requireUser.js";

router.get("/:postId", requireUser, async (req, res) => {
  try {
    const attendees = await getPostAttendeesByPostId(req.params.postId);
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendees" });
  }
});

router.post("/:postId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const attendee = await createPostAttendee({ postId, userId });
    if (!attendee) {
      return res.status(403).json({
        error:
          "Unauthorized: You must be a member of the club to RSVP to this run.",
      });
    }
    res.status(201).json(attendee);
  } catch (err) {
    res.status(400).json({ error: "Already RSVP'd or post does not exist." });
  }
});

router.delete("/:postId", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const deleted = await removePostAttendee(userId, postId);
    if (!deleted) {
      return res.status(404).json({ error: "RSVP not found." });
    }
    res.json({ message: "Successfully left the run." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove RSVP." });
  }
});

export default router;
