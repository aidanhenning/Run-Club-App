import express from "express";
const router = express.Router();

import { getClubs } from "../db/queries/clubs.js";

router.get("/", async (req, res) => {
  try {
    const clubs = await getClubs();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description, owner } = req.body;

  try {
    const club = await createUser({ name, description, owner });
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
