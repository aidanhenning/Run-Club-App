import db from "../client.js";

export async function createCommentLike({ commentId, userId }) {
  const sql = `
  INSERT INTO comment_likes
    (comment_id, user_id)
  VALUES
    ($1, $2) 
  RETURNING *
  `;
  const {
    rows: [commentLike],
  } = await db.query(sql, [commentId, userId]);
  return commentLike;
}

export async function getCommentLikes() {
  const sql = `
  SELECT * FROM comment_likes
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function removeCommentLike(userId, commentId) {
  const sql = `
  DELETE FROM comment_likes
  WHERE user_id = $1 AND comment_id = $2
  RETURNING *
  `;
  const {
    rows: [commentLike],
  } = await db.query(sql, [userId, commentId]);
  return commentLike;
}
