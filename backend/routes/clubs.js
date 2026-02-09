import express from "express";
import { getClubs } from "../db/queries/clubs.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clubs = await getClubs();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
