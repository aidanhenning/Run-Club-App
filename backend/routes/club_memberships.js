import express from "express";
const router = express.Router();

import {
  createClubMembership,
  getClubMembershipsByUserId,
  removeClubMembership,
} from "../db/queries/club_memberships";
import requireUser from "../middleware/requireUser.js";

router.get("/", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const clubs = await getClubMembershipsByUserId(userId);
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your memberships" });
  }
});

router.post("/:id", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const clubId = req.params.id;
    const membership = await createClubMembership({ userId, clubId });
    res.status(201).json(membership);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Could not join club. You might already be a member." });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const clubId = req.params.id;
    const deleted = await removeClubMembership(userId, clubId);
    if (!deleted) {
      return res.status(404).json({ error: "Membership not found" });
    }
    res.json({ message: "Successfully left the club", membership: deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to leave club" });
  }
});

export default router;
