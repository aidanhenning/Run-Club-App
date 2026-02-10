import express from "express";
const router = express.Router();

import { searchClubs } from "../db/queries/clubs.js";
import { searchUsers } from "../db/queries/users.js";
import requireUser from "../middleware/requireUser.js";

router.get("/clubs", requireUser, async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) return res.status(200).json([]);

    const results = await searchClubs(req.user.id, term);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Club search failed" });
  }
});

router.get("/people", requireUser, async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) return res.status(200).json([]);

    const results = await searchUsers(req.user.id, term);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "People search failed" });
  }
});

export default router;
