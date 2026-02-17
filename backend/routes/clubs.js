import express from "express";
const router = express.Router();

import {
  createClub,
  searchClubs,
  updateClub,
  removeClub,
} from "../db/queries/clubs.js";
import { getClubProfile } from "../db/queries/getClubProfile.js";
import requireUser from "../middleware/requireUser.js";

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newClub = await createClub(name, description, req.user.id);
    res.status(201).json(newClub);
  } catch (err) {
    res.status(500).json({ error: "Failed to create club" });
  }
});

router.get("/", requireUser, async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const userId = req.user.id;
    const clubs = await searchClubs(userId, searchTerm || "");
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
});

router.get("/:id", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await getClubProfile(req.params.id, userId);
    if (!profile.club) return res.status(404).json({ error: "Club not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch club profile" });
  }
});

router.put("/:id", requireUser, async (req, res) => {
  try {
    const updatedClub = await updateClub(req.params.id, req.user.id, req.body);

    if (!updatedClub) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You do not own this club" });
    }

    res.json(updatedClub);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    const deleted = await removeClub(req.params.id, req.user.id);

    if (!deleted) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You do not own this club" });
    }

    res.json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
