import db from "../client.js";

export async function createPostAttendee({ postId, userId }) {
  const sql = `
    INSERT INTO post_attendees (post_id, user_id)
    SELECT $1, $2
    FROM posts p
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE p.id = $1 AND cm.user_id = $2
    RETURNING *;
  `;
  const {
    rows: [postAttendee],
  } = await db.query(sql, [postId, userId]);
  return postAttendee;
}

export async function getPostAttendeesByPostId(postId) {
  const sql = `
    SELECT u.id, u.first_name, u.last_name, u.profile_picture_url
    FROM users u
    JOIN post_attendees pa ON u.id = pa.user_id
    WHERE pa.post_id = $1
  `;
  const { rows } = await db.query(sql, [postId]);
  return rows;
}

export async function removePostAttendee(userId, postId) {
  const sql = `
    DELETE FROM post_attendees
    WHERE user_id = $1 AND post_id = $2
    RETURNING *;
  `;
  const {
    rows: [attendee],
  } = await db.query(sql, [userId, postId]);
  return attendee;
}
