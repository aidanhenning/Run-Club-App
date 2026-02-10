import db from "../client.js";

export async function createClub({ name, description, owner }) {
  const sql = `
  INSERT INTO clubs
    (name, description, owner)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [name, description, owner]);
  return club;
}

export async function getClubs() {
  const sql = `
  SELECT * FROM clubs
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function searchClubs(userId, searchTerm) {
  const sql = `
  SELECT 
    c.id, 
    c.name, 
    c.location, 
    cm.id AS membership_id 
  FROM clubs c
  LEFT JOIN club_memberships cm 
    ON c.id = cm.club_id AND cm.user_id = $1
  WHERE c.name ILIKE $2
  LIMIT 15
  `;
  const { rows } = await db.query(sql, [userId, searchTerm]);
  return rows;
}
