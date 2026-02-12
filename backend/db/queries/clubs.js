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

export async function getClubProfile(clubId, userId) {
  // 1. Get the Header Info (Club details + the user's personal membership stats)
  const clubHeaderSql = `
    SELECT 
      c.name, c.logo, c.description, c.created_at,
      cm.runs_with_club, cm.joined_at
    FROM clubs c
    LEFT JOIN club_memberships cm ON c.id = cm.club_id AND cm.user_id = $2
    WHERE c.id = $1;
  `;

  // 2. Get Upcoming Events (Runs where starts_at is in the future)
  const upcomingEventsSql = `
    SELECT id, title, starts_at, address, run_type
    FROM posts
    WHERE club_id = $1 AND starts_at >= NOW()
    ORDER BY starts_at ASC;
  `;

  // 3. Get Members List
  const membersSql = `
    SELECT u.id, u.first_name, u.last_name, u.profile_picture_url, cm.runs_with_club
    FROM users u
    JOIN club_memberships cm ON u.id = cm.user_id
    WHERE cm.club_id = $1
    ORDER BY cm.runs_with_club DESC;
  `;

  // Execute all queries
  const clubHeader = await db.query(clubHeaderSql, [clubId, userId]);
  const upcoming = await db.query(upcomingEventsSql, [clubId]);
  const members = await db.query(membersSql, [clubId]);

  return {
    club: clubHeader.rows[0],
    upcomingEvents: upcoming.rows,
    members: members.rows,
  };
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
