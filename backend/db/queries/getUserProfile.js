import db from "../client.js";

export async function getUserProfile(userId) {
  // 1. Get Core Profile Info + Social Counts + Activity Totals
  const userHeaderSql = `
    SELECT 
      u.id, u.first_name, u.last_name, u.bio, u.profile_picture_url, u.location,
      (SELECT COUNT(*) FROM followers WHERE followed_user_id = $1)::int AS followers_count,
      (SELECT COUNT(*) FROM followers WHERE follower_id = $1)::int AS following_count,
      COALESCE(SUM(p.distance), 0)::float AS total_distance,
      COALESCE(SUM(p.duration), 0)::int AS total_time,
      COALESCE(SUM(p.elevation), 0)::int AS total_elevation
    FROM users u
    LEFT JOIN posts p ON u.id = p.owner_id
    WHERE u.id = $1
    GROUP BY u.id;
  `;

  // 2. Get Post Gallery (All image URLs for posts owned by this user)
  const userPostsSql = `
    SELECT id, image_url, title, created_at
    FROM posts
    WHERE owner_id = $1
    ORDER BY created_at DESC;
  `;

  // 3. Get Club Memberships (Clubs this user is a part of)
  const userClubsSql = `
    SELECT c.id, c.name, c.logo
    FROM clubs c
    JOIN club_memberships cm ON c.id = cm.club_id
    WHERE cm.user_id = $1
    ORDER BY c.name ASC;
  `;

  // Execute all queries
  const userHeader = await db.query(userHeaderSql, [userId]);
  const userPosts = await db.query(userPostsSql, [userId]);
  const userClubs = await db.query(userClubsSql, [userId]);

  // Return formatted object
  return {
    user: userHeader.rows[0],
    posts: userPosts.rows,
    clubs: userClubs.rows,
  };
}
