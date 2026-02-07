import db from "../client.js";

export async function createPostPicture({ postId, userId, imageUrl }) {
  const sql = `
  INSERT INTO post_pictures
    (post_id, user_id, image_url)
  VALUES
    ($1, $2, $3) 
  RETURNING *
  `;
  const {
    rows: [postPicture],
  } = await db.query(sql, [postId, userId, imageUrl]);
  return postPicture;
}

export async function getPostPictures() {
  const sql = `
  SELECT * FROM post_pictures
  `;
  const { rows } = await db.query(sql);
  return rows;
}
