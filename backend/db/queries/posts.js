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
