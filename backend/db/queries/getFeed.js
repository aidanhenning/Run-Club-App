import db from "../client.js";

export async function getFeed(userId) {
  const sql = `
  SELECT 
    -- Club Information
    c.id AS club_id,
    c.name AS club_name,
    c.logo AS club_logo,
    
    -- Post Information
    p.id,
    p.title,
    p.starts_at,
    p.address,
    p.distance,
    p.elevation,
    p.run_type,
    p.bible_reference,
    p.bible_text,
    
    -- Formatting the INTERVAL to a simple string (e.g., "01:30:00")
    p.estimated_time::TEXT AS estimated_time,

    -- Counts (Simple Sub-queries)
    (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) AS like_count,
    (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) AS comment_count,
    (SELECT COUNT(*) FROM post_attendees WHERE post_id = p.id) AS attendee_count

  FROM posts p
  JOIN clubs c ON p.club_id = c.id
  JOIN club_memberships cm ON p.club_id = cm.club_id
  WHERE cm.user_id = $1
  ORDER BY p.starts_at DESC;
    `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}
