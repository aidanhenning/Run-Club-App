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
