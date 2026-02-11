import db from "../client.js";

export async function createFollower({ followerId, followedUserId }) {
  const sql = `
  INSERT INTO followers
    (follower_id, followed_user_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [follower],
  } = await db.query(sql, [followerId, followedUserId]);
  return follower;
}

export async function getFollowers() {
  const sql = `
  SELECT * FROM followers
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function removeFollower(followerId, followedUserId) {
  const sql = `
  DELETE FROM followers
  WHERE follower_id = $1 AND followed_user_id = $2
  RETURNING *
  `;
  const {
    rows: [follower],
  } = await db.query(sql, [followerId, followedUserId]);
  return follower;
}
