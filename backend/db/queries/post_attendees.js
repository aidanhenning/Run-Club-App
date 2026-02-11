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

export async function removePostAttendee(userId, postId) {
  const sql = `
  DELETE FROM post_attendees
  WHERE user_id = $1 AND post_id = $2
  RETURNING *
  `;
  const {
    rows: [attendee],
  } = await db.query(sql, [userId, postId]);
  return rows;
}
