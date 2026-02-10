import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";

import { createUser, getUsers, getUserByEmail } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import { createToken } from "../utils/jwt.js";

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/register",
  requireBody(["firstName", "lastName", "email", "password"]),
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = createToken({ id: user.id });
      delete user.password;
      res.status(201).json({ token, user });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(409).json({ error: "Email already in use" });
      }

      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken({ id: user.id });
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
