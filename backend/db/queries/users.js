import db from "../client.js";

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

export async function searchUsers(userId, searchTerm) {
  const sql = `
  SELECT 
    u.id, 
    u.full_name, 
    u.profile_picture,
    f.id AS follow_id
  FROM users u
  LEFT JOIN followers f 
    ON u.id = f.following_id AND f.follower_id = $1
  WHERE u.full_name ILIKE $2 AND u.id != $1
  LIMIT 15;
  `;
  const { rows } = await db.query(sql, [userId, searchTerm]);
  return rows;
}
