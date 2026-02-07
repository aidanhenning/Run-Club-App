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
