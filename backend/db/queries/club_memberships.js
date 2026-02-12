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

export async function getClubMembershipsByUserId(userId) {
  const sql = `
  SELECT 
    c.id,
    c.name, 
    c.logo,

    (SELECT COUNT(*) FROM club_memberships WHERE club_id = c.id) AS member_count
    
  FROM clubs c
  JOIN club_memberships cm ON c.id = cm.club_id
  WHERE cm.user_id = $1
  ORDER BY c.name ASC;
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function removeClubMembership(userId, clubId) {
  const sql = `
  DELETE FROM club_memberships
  WHERE user_id = $1 AND club_id = $2
  RETURNING *
  `;
  const {
    rows: [membership],
  } = await db.query(sql, [userId, clubId]);
  return membership;
}
