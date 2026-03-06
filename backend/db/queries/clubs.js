import db from "../client.js";

export async function createClub({ name, description, logo, owner }) {
  const clubSql = `
    INSERT INTO clubs (name, description, logo, owner)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const {
    rows: [newClub],
  } = await db.query(clubSql, [name, description, logo, owner]);

  const memberSql = `
    INSERT INTO club_memberships (club_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const {
    rows: [membership],
  } = await db.query(memberSql, [newClub.id, owner]);

  return {
    ...newClub,
    membershipId: membership.id,
  };
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

export async function getClubById(id) {
  const sql = `
    SELECT id, name, description, logo, owner
    FROM clubs
    WHERE id = $1;
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
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
    is_member DESC,
    c.name ASC;
  `;
  const { rows } = await db.query(sql, [userId, `%${searchTerm}%`]);
  return rows;
}

export async function updateClub(clubId, userId, { name, description, logo }) {
  const sql = `
    UPDATE clubs 
    SET 
      name = COALESCE($1, name), 
      description = COALESCE($2, description), 
      logo = COALESCE($3, logo)
    WHERE id = $4 AND owner = $5
    RETURNING *;
  `;

  const { rows } = await db.query(sql, [
    name || null,
    description || null,
    logo || null,
    clubId,
    userId,
  ]);

  return rows[0];
}

export async function removeClub(clubId, userId) {
  const sql = `
    DELETE FROM clubs 
    WHERE id = $1 AND owner = $2
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [clubId, userId]);
  return rows[0];
}
