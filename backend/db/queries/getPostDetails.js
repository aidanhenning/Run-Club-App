import db from "../client.js";

export async function getPostDetails(postId, userId) {
  const sql = `
  SELECT 
    -- Club Information
    c.id AS club_id,
    c.name AS club_name,
    c.logo AS club_logo,
    c.owner AS club_owner_id,
    u_owner.first_name AS owner_first_name,
    u_owner.last_name AS owner_last_name,
    u_owner.profile_picture_url AS owner_profile_picture,
    
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
    p.estimated_time::TEXT AS estimated_time,

    -- User-Specific Interaction
    EXISTS (
      SELECT 1 FROM post_likes 
      WHERE post_id = p.id AND user_id = $2
    ) AS is_liked,
    EXISTS (
      SELECT 1 FROM post_attendees 
      WHERE post_id = p.id AND user_id = $2
    ) AS is_attending,

    -- Simple Counts
    (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) AS like_count,
    (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) AS comment_count,
    (SELECT COUNT(*) FROM post_attendees WHERE post_id = p.id) AS attendee_count,

    -- Nested Attendees Array
    (SELECT COALESCE(json_agg(json_build_object(
        'user_id', u.id,
        'profile_picture_url', u.profile_picture_url,
        'first_name', u.first_name
      )), '[]')
     FROM post_attendees pa
     JOIN users u ON pa.user_id = u.id
     WHERE pa.post_id = p.id
    ) AS attendees,

    -- Nested Pictures Array
    (SELECT COALESCE(json_agg(json_build_object(
        'id', pp.id,
        'user_id', pp.user_id,
        'image_url', pp.image_url
      )), '[]')
     FROM post_pictures pp
     WHERE pp.post_id = p.id
    ) AS pictures,

    -- Nested Comments Array
    (SELECT COALESCE(json_agg(comment_data), '[]')
     FROM (
       SELECT 
         pc.id,
         pc.content,
         pc.created_at,
         u.id AS user_id,
         u.first_name,
         u.last_name,
         u.profile_picture_url,
         (pc.user_id = $2) AS is_my_comment,
         (SELECT COUNT(*) FROM comment_likes WHERE comment_id = pc.id) AS comment_like_count
       FROM post_comments pc
       JOIN users u ON pc.user_id = u.id
       WHERE pc.post_id = p.id
       ORDER BY pc.created_at ASC
     ) comment_data
    ) AS comments

  FROM posts p
  JOIN clubs c ON p.club_id = c.id
  JOIN users u_owner ON c.owner = u_owner.id
  WHERE p.id = $1;
  `;

  const { rows } = await db.query(sql, [postId, userId]);
  return rows[0];
}
