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
    u.first_name,
    u.last_name,
    u.profile_picture_url,
    u.location,
    COALESCE(BOOL_OR(f.follower_id = $1), false) AS is_followed
  FROM users u
  LEFT JOIN followers f 
    ON u.id = f.followed_id
  WHERE 
    (
      u.first_name ILIKE $2 OR 
      u.last_name ILIKE $2 OR
      (u.first_name || ' ' || u.last_name) ILIKE $2
    )
  AND u.id != $1
  GROUP BY u.id
  ORDER BY 
    is_followed DESC,
    u.last_name ASC;
  `;
  const { rows } = await db.query(sql, [userId, `%${searchTerm}%`]);
  return rows;
}

export async function updateUserById(targetUserId, currentUserId, updates) {
  const {
    firstName,
    lastName,
    email,
    password,
    bio,
    profilePictureUrl,
    location,
  } = updates;

  const sql = `
  UPDATE users
  SET 
    first_name = COALESCE($3, first_name), 
    last_name = COALESCE($4, last_name), 
    email = COALESCE($5, email), 
    password = COALESCE($6, password), 
    bio = COALESCE($7, bio), 
    profile_picture_url = COALESCE($8, profile_picture_url), 
    location = COALESCE($9, location)
  WHERE id = $1 AND id = $2
  RETURNING id, first_name, last_name, email, bio, profile_picture_url, location;
  `;

  const {
    rows: [user],
  } = await db.query(sql, [
    targetUserId,
    currentUserId,
    firstName || null,
    lastName || null,
    email || null,
    password || null,
    bio || null,
    profilePictureUrl || null,
    location || null,
  ]);

  return user;
}

export async function removeUser(userId) {
  const sql = `
  DELETE FROM users
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [userId]);
  return user;
}
