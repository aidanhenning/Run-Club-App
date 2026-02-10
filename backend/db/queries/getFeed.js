import db from "../client.js";

export async function getFeed(userId) {
  const sql = `
    SELECT p.title, p.starts_at, p.run_type, p.distance, p.terrain, p.address,
           c.name AS club_name, u.full_name AS host_name
    FROM posts p
    JOIN clubs c ON p.club_id = c.id
    JOIN users u ON p.host_id = u.id
    JOIN club_memberships cm ON p.club_id = cm.club_id
    WHERE cm.user_id = $1
    ORDER BY p.starts_at DESC;
    `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}
