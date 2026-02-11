import db from "../client.js";

export async function createPost({
  clubId,
  hostId,
  title,
  startsAt,
  typeOfRun,
  distance,
  terrain,
  address,
}) {
  const sql = `
  INSERT INTO posts
    (club_id, host_id, title, starts_at, type_of_run, distance, terrain, address)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8) 
  RETURNING *
  `;
  const {
    rows: [post],
  } = await db.query(sql, [
    clubId,
    hostId,
    title,
    startsAt,
    typeOfRun,
    distance,
    terrain,
    address,
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
  typeOfRun,
  distance,
  terrain,
  address,
) {
  const sql = `
  UPDATE posts 
  SET title = $2, starts_at = $3, type_of_run = $4, distance = $5, terrain = $6, address = $7
  WHERE id = $1 
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [
    postId,
    title,
    startsAt,
    typeOfRun,
    distance,
    terrain,
    address,
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
