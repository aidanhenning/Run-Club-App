import db from "../client.js";

export async function createPostLike({ postId, userId }) {
  const sql = `
    INSERT INTO post_likes (post_id, user_id)
    SELECT $1, $2
    FROM posts p
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE p.id = $1 AND cm.user_id = $2
    RETURNING *;
  `;
  const {
    rows: [postLike],
  } = await db.query(sql, [postId, userId]);
  return postLike;
}

export async function getPostLikesByPostId(postId) {
  const sql = `
    SELECT u.id, u.first_name, u.last_name, u.profile_picture_url
    FROM users u
    JOIN post_likes pl ON u.id = pl.user_id
    WHERE pl.post_id = $1;
  `;
  const { rows } = await db.query(sql, [postId]);
  return rows;
}

export async function removePostLike(userId, postId) {
  const sql = `
    DELETE FROM post_likes
    WHERE user_id = $1 AND post_id = $2
    RETURNING *;
  `;
  const {
    rows: [postLike],
  } = await db.query(sql, [userId, postId]);
  return postLike;
}
