import db from "../client.js";

export async function getUserProfile(userId) {
  // 1. Get Core Profile Info + Social Counts + Activity Totals
  const userHeaderSql = `
    SELECT 
      u.id, u.first_name, u.last_name, u.bio, u.profile_picture_url, u.location,
      (SELECT COUNT(*) FROM followers WHERE followed_id = $1)::int AS followers_count,
      (SELECT COUNT(*) FROM followers WHERE follower_id = $1)::int AS following_count,
      COALESCE(SUM(p.distance), 0)::float AS total_distance,
      COALESCE(SUM(EXTRACT(EPOCH FROM p.estimated_time)), 0)::int AS total_time,
      COALESCE(SUM(p.elevation), 0)::int AS total_elevation
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    WHERE u.id = $1
    GROUP BY u.id;
  `;

  // 2. Get Post Gallery (All image URLs for posts owned by this user)
  const userPostsSql = `
  SELECT DISTINCT ON (p.id) 
    p.id, p.title, p.created_at, pp.image_url
  FROM posts p
  LEFT JOIN post_pictures pp ON p.id = pp.post_id
  WHERE p.user_id = $1
  ORDER BY p.id, p.created_at DESC;
`;

  // 3. Get Club Memberships (Clubs this user is a part of)
  const userClubsSql = `
    SELECT c.id, c.name, c.logo
    FROM clubs c
    JOIN club_memberships cm ON c.id = cm.club_id
    WHERE cm.user_id = $1
    ORDER BY c.name ASC;
  `;

  const userHeader = await db.query(userHeaderSql, [userId]);
  const userPosts = await db.query(userPostsSql, [userId]);
  const userClubs = await db.query(userClubsSql, [userId]);

  return {
    user: userHeader.rows[0],
    posts: userPosts.rows,
    clubs: userClubs.rows,
  };
}
