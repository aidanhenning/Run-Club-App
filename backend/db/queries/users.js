import db from "../client.js";

export async function createUser({ firstName, lastName, email, password }) {
  const sql = `
  INSERT INTO users
    (first_name, last_name, email, password)
  VALUES
    ($1, $2, $3, $4) 
  RETURNING *
  `;
  const {
    rows: [user],
  } = await db.query(sql, [firstName, lastName, email, password]);
  return user;
}

export async function getUsers() {
  const sql = `
  SELECT * FROM users
  `;
  const { rows } = await db.query(sql);
  return rows;
}
