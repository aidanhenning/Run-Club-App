import db from "../client.js";

export async function createPost({
  userId,
  clubId,
  title,
  startsAt,
  address,
  distance,
  elevation,
  runType,
  estimatedTime,
  bibleReference,
  bibleText,
}) {
  const sql = `
    INSERT INTO posts
      (user_id, club_id, title, starts_at, address, distance, elevation, run_type, estimated_time, bible_reference, bible_text)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    FROM clubs
    WHERE owner = $1 AND id = $2
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [
    userId,
    clubId,
    title,
    startsAt,
    address,
    distance,
    elevation,
    runType,
    estimatedTime,
    bibleReference,
    bibleText,
  ]);
  return rows[0];
}

export async function getPostById(postId) {
  const sql = `
  SELECT * FROM posts
  WHERE id = $1
  `;
  const {
    rows: [post],
  } = await db.query(sql, [postId]);
  return post;
}

export async function updatePostById(
  postId,
  userId,
  {
    title,
    startsAt,
    address,
    distance,
    elevation,
    runType,
    estimatedTime,
    bibleReference,
    bibleText,
  },
) {
  const sql = `
    UPDATE posts p
    SET 
      title = $3, starts_at = $4, address = $5, distance = $6, 
      elevation = $7, run_type = $8, estimated_time = $9, 
      bible_reference = $10, bible_text = $11
    FROM clubs c
    WHERE p.id = $1 AND p.club_id = c.id AND c.owner = $2
    RETURNING p.*;
  `;
  const { rows } = await db.query(sql, [
    postId,
    userId,
    title,
    startsAt,
    address,
    distance,
    elevation,
    runType,
    estimatedTime,
    bibleReference,
    bibleText,
  ]);
  return rows[0];
}

export async function removePost(postId, userId) {
  const sql = `
    DELETE FROM posts p
    USING clubs c
    WHERE p.id = $1 AND p.club_id = c.id AND c.owner = $2
    RETURNING p.*;
  `;
  const { rows } = await db.query(sql, [postId, userId]);
  return rows[0];
}
