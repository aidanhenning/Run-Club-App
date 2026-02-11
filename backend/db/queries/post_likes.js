import db from "../client.js";

export async function createPostLike({ postId, userId }) {
  const sql = `
  INSERT INTO post_likes
    (post_id, user_id)
  VALUES
    ($1, $2) 
  RETURNING *
  `;
  const {
    rows: [postLike],
  } = await db.query(sql, [postId, userId]);
  return postLike;
}

export async function getPostLikes() {
  const sql = `
  SELECT * FROM post_likes
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function removePostLike(userId, postId) {
  const sql = `
  DELETE FROM post_likes
  WHERE user_id = $1 AND post_id = $2
  RETURNING *
  `;
  const {
    rows: [postLike],
  } = await db.query(sql, [userId, postId]);
  return postLike;
}
