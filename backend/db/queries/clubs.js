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
