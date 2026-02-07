import db from "../client.js";

export async function createPostComment({ postId, userId, content }) {
  const sql = `
  INSERT INTO post_comments
    (post_id, user_id, content)
  VALUES
    ($1, $2, $3) 
  RETURNING *
  `;
  const {
    rows: [postComment],
  } = await db.query(sql, [postId, userId, content]);
  return postComment;
}

export async function getPostComments() {
  const sql = `
  SELECT * FROM post_comments
  `;
  const { rows } = await db.query(sql);
  return rows;
}
