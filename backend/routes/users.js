import express from "express";
import { createUser } from "../db/queries/users.js";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await createUser({ firstName, lastName, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
