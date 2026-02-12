import db from "../client.js";

export async function createPost({
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
    (club_id, title, starts_at, address, distance, elevation, run_type, estimated_time, bible_reference, bible_text)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING *
  `;
  const {
    rows: [post],
  } = await db.query(sql, [
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
  return post;
}

export async function getPosts() {
  const sql = `
  SELECT * FROM posts
  `;
  const { rows } = await db.query(sql);
  return rows;
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
  title,
  startsAt,
  address,
  distance,
  elevation,
  runType,
  estimatedTime,
  bibleReference,
  bibleText,
) {
  const sql = `
  UPDATE posts 
  SET title = $2, starts_at = $3, address = $4, distance = $5, elevation = $6, run_type = $7, estimated_time = $8, bible_reference = $9, bible_text = $10
  WHERE id = $1 
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [
    postId,
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
  return club;
}

export async function removePost(postId) {
  const sql = `
  DELETE FROM posts
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [post],
  } = await db.query(sql, [postId]);
  return post;
}
