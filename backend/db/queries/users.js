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
  INSERT INTO employees
    (first_name, last_name, email, password, bio, profile_picture_url, location)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7) 
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [
    user_id,
    firstName,
    lastName,
    email,
    hashedPassword,
    bio,
    profilePictureUrl,
    location,
    created_at,
  ]);
  return user;
}

export async function getUserByEmailAndPassword(email, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const sql = `
    SELECT *
    FROM users
    WHERE id=$1
    `;
  const { rows: user } = await db.query(sql, [id]);
  return user;
}
