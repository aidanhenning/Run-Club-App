import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser({
  firstName,
  lastName,
  email,
  password,
  bio,
  profilePictureUrl,
  location,
}) {
  const sql = `
  INSERT INTO users
    (first_name, last_name, email, password, bio, profile_picture_url, location)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [
    firstName,
    lastName,
    email,
    password,
    bio,
    profilePictureUrl,
    location,
  ]);
  return user;
}

export async function getUsers() {
  const sql = `
  SELECT * FROM users
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  return user;
}

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
