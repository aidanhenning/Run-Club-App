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

export async function getClubById(clubId) {
  const sql = `
  SELECT * FROM clubs
  WHERE id = $1
  `;
  const {
    rows: [club],
  } = await db.query(sql, [clubId]);
  return club;
}

export async function updateClubById(clubId, name, description, logo, owner) {
  const sql = `
  UPDATE clubs 
  SET name = $2, description = $3, logo = $4, owner = $5 
  WHERE id = $1 
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [clubId, name, description, logo, owner]);
  return club;
}

export async function searchClubs(userId, searchTerm) {
  const sql = `
  SELECT
    c.id,
    c.name,
    c.logo,
    COUNT(cm.user_id) AS member_count,
    BOOL_OR(cm.user_id = $1) AS is_member
  FROM clubs c
  LEFT JOIN club_memberships cm
    ON cm.club_id = c.id
  WHERE c.name ILIKE $2
  GROUP BY c.id, c.name, c.logo
  ORDER BY c.name;
  `;
  const { rows } = await db.query(sql, [userId, `%${searchTerm}%`]);
  return rows;
}

export async function removeClub(clubId) {
  const sql = `
  DELETE FROM clubs
  WHERE club_id = $1
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [clubId]);
  return club;
}
