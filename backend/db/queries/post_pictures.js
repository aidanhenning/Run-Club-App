import db from "../client.js";

export async function createPostPicture({ postId, userId, imageUrl }) {
  const sql = `
    INSERT INTO post_pictures (post_id, user_id, image_url)
    SELECT $1, $2, $3
    FROM posts p
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE p.id = $1 AND cm.user_id = $2
    RETURNING *;
  `;
  const {
    rows: [postPicture],
  } = await db.query(sql, [postId, userId, imageUrl]);
  return postPicture;
}

export async function getPostPicturesByPostId(postId) {
  const sql = `
    SELECT pp.*, u.first_name, u.last_name 
    FROM post_pictures pp
    JOIN users u ON pp.user_id = u.id
    WHERE pp.post_id = $1
    ORDER BY pp.created_at DESC;
  `;
  const { rows } = await db.query(sql, [postId]);
  return rows;
}

export async function removePostPicture(pictureId, userId) {
  const sql = `
    DELETE FROM post_pictures
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  const {
    rows: [picture],
  } = await db.query(sql, [pictureId, userId]);
  return picture;
}
