import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";

import {
  createUser,
  getUserByEmail,
  searchUsers,
  updateUserById,
  removeUser,
} from "../db/queries/users.js";
import { getUserProfile } from "../db/queries/getUserProfile.js";
import { createToken } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";

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

router.get("/search", requireUser, async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const userId = req.user.id;
    const users = await searchUsers(userId, searchTerm || "");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to search users" });
  }
});

router.get("/:id", requireUser, async (req, res) => {
  try {
    const profile = await getUserFullProfile(req.params.id);
    if (!profile.user) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

router.put("/:id", requireUser, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile" });
    }

    const updatedUser = await updateUserById(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this profile" });
    }

    const deleted = await removeUser(req.params.id);
    res.json({ message: "User deleted successfully", user: deleted });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
