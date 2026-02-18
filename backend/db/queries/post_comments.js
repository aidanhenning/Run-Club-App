import db from "../client.js";

export async function createPostComment({ postId, userId, content }) {
  const sql = `
    INSERT INTO post_comments (post_id, user_id, content)
    SELECT $1, $2, $3
    FROM posts p
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE p.id = $1 AND cm.user_id = $2
    RETURNING *;
  `;
  const {
    rows: [postComment],
  } = await db.query(sql, [postId, userId, content]);
  return postComment;
}

export async function getPostCommentsByPostId(postId) {
  const sql = `
    SELECT pc.*, u.first_name, u.last_name, u.profile_picture_url
    FROM post_comments pc
    JOIN users u ON pc.user_id = u.id
    WHERE pc.post_id = $1
    ORDER BY pc.created_at ASC;
  `;
  const { rows } = await db.query(sql, [postId]);
  return rows;
}

export async function updatePostCommentById(commentId, userId, content) {
  const sql = `
    UPDATE post_comments 
    SET content = $3 
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  const {
    rows: [comment],
  } = await db.query(sql, [commentId, userId, content]);
  return comment;
}

export async function removePostComment(commentId, userId) {
  const sql = `
    DELETE FROM post_comments pc
    USING posts p, clubs c
    WHERE pc.id = $1 
    AND pc.post_id = p.id 
    AND p.club_id = c.id
    AND (pc.user_id = $2 OR c.owner = $2)
    RETURNING pc.*;
  `;
  const {
    rows: [comment],
  } = await db.query(sql, [commentId, userId]);
  return comment;
}
