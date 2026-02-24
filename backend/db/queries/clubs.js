import db from "../client.js";

export async function createClub({ name, description, logo, owner }) {
  const sql = `
  INSERT INTO clubs
    (name, description, logo, owner)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [club],
  } = await db.query(sql, [name, description, logo, owner]);
  return club;
}

export async function getClubsByOwner(userId) {
  const sql = `
  SELECT id, name
  FROM clubs
  WHERE owner = $1
  ORDER BY name
  ASC
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function searchClubs(userId, searchTerm) {
  const sql = `
  SELECT
    c.id,
    c.name,
    c.logo,
    COUNT(cm.user_id) AS member_count,
    COALESCE(BOOL_OR(cm.user_id = $1), false) AS is_member
  FROM clubs c
  LEFT JOIN club_memberships cm
    ON cm.club_id = c.id
  WHERE c.name ILIKE $2
  GROUP BY c.id, c.name, c.logo
  ORDER BY 
    is_member DESC, -- Prioritize joined clubs
    c.name ASC;
  `;
  const { rows } = await db.query(sql, [userId, `%${searchTerm}%`]);
  return rows;
}

export async function updateClub(clubId, userId, { name, description, logo }) {
  const sql = `
    UPDATE clubs 
    SET name = $1, description = $2, logo = $3
    WHERE id = $4 AND owner = $5
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [
    name,
    description,
    logo,
    clubId,
    userId,
  ]);
  return rows[0]; // Will be undefined if the user isn't the owner
}

export async function removeClub(clubId, userId) {
  const sql = `
    DELETE FROM clubs 
    WHERE id = $1 AND owner = $2
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [clubId, userId]);
  return rows[0]; // Will be undefined if the user isn't the owner
}
