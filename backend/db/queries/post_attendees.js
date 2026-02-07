import db from "../client.js";

export async function createPostAttendee({ postId, userId }) {
  const sql = `
  INSERT INTO post_attendees
    (post_id, user_id)
  VALUES
    ($1, $2) 
  RETURNING *
  `;
  const {
    rows: [postAttendee],
  } = await db.query(sql, [postId, userId]);
  return postAttendee;
}

export async function getPostAttendees() {
  const sql = `
  SELECT * FROM post_attendees
  `;
  const { rows } = await db.query(sql);
  return rows;
}
