import db from "../client.js";

export async function createCommentLike({ commentId, userId }) {
  const sql = `
    INSERT INTO comment_likes (comment_id, user_id)
    SELECT $1, $2
    FROM post_comments pc
    JOIN posts p ON pc.post_id = p.id
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE pc.id = $1 AND cm.user_id = $2
    RETURNING *;
  `;
  const {
    rows: [commentLike],
  } = await db.query(sql, [commentId, userId]);
  return commentLike;
}

export async function getCommentLikesByCommentId(commentId) {
  const sql = `
    SELECT u.id, u.first_name, u.last_name, u.profile_picture_url
    FROM users u
    JOIN comment_likes cl ON u.id = cl.user_id
    WHERE cl.comment_id = $1;
  `;
  const { rows } = await db.query(sql, [commentId]);
  return rows;
}

export async function removeCommentLike(userId, commentId) {
  const sql = `
    DELETE FROM comment_likes
    WHERE user_id = $1 AND comment_id = $2
    RETURNING *;
  `;
  const {
    rows: [commentLike],
  } = await db.query(sql, [userId, commentId]);
  return commentLike;
}
