import db from "../client.js";
import { getPostPicturesByUserId } from "./post_pictures.js";
import { getClubMembershipsByUserId } from "./club_memberships.js";

export async function getUserProfile(targetUserId, currentUserId) {
  // 1. Get Core Profile Info + Social Counts + Activity Totals
  const userHeaderSql = `
SELECT 
      id, first_name, last_name, bio, profile_picture_url, location,
      EXISTS (
        SELECT 1 FROM followers 
        WHERE follower_id = $2 AND followed_id = $1
      ) AS is_followed,
      (SELECT COUNT(*) FROM followers WHERE followed_id = $1)::int AS followers_count,
      (SELECT COUNT(*) FROM followers WHERE follower_id = $1)::int AS following_count,
      (
        SELECT COUNT(*)::int 
        FROM post_attendees pa
        JOIN posts p_inner ON pa.post_id = p_inner.id
        WHERE pa.user_id = $1 AND p_inner.club_id IS NOT NULL
      ) AS club_runs_count
    FROM users
    WHERE id = $1;
  `;
  const [headerRes, posts, clubs] = await Promise.all([
    db.query(userHeaderSql, [targetUserId, currentUserId]),
    getPostPicturesByUserId(targetUserId),
    getClubMembershipsByUserId(targetUserId),
  ]);

  return {
    user: headerRes.rows[0],
    posts: posts,
    clubs: clubs,
  };
}
