import db from "../client.js";

export async function createFollower({ followerId, followedId }) {
  const sql = `
  INSERT INTO followers
    (follower_id, followed_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [follower],
  } = await db.query(sql, [followerId, followedId]);
  return follower;
}

export async function getFollowers(userId) {
  const sql = `
    SELECT 
      u.id, 
      u.first_name, 
      u.last_name, 
      u.profile_picture_url
    FROM users u
    JOIN followers f ON u.id = f.follower_id
    WHERE f.followed_id = $1
    ORDER BY u.first_name ASC;
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function getFollowing(userId) {
  const sql = `
    SELECT 
      u.id, 
      u.first_name, 
      u.last_name, 
      u.profile_picture_url
    FROM users u
    JOIN followers f ON u.id = f.followed_id
    WHERE f.follower_id = $1
    ORDER BY u.first_name ASC;
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function removeFollower(followerId, followedId) {
  const sql = `
  DELETE FROM followers
  WHERE follower_id = $1 AND followed_id = $2
  RETURNING *
  `;
  const {
    rows: [follower],
  } = await db.query(sql, [followerId, followedId]);
  return follower;
}
