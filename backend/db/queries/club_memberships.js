import db from "../client.js";

export async function createClubMembership({ userId, clubId }) {
  const sql = `
  INSERT INTO club_memberships
    (user_id, club_id)
  VALUES
    ($1, $2) 
  RETURNING *
  `;
  const {
    rows: [membership],
  } = await db.query(sql, [userId, clubId]);
  return membership;
}

export async function getClubMemberships() {
  const sql = `
  SELECT * FROM club_memberships
  `;
  const { rows } = await db.query(sql);
  return rows;
}
