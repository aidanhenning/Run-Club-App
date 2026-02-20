import db from "../client.js";

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

  const clubHeader = await db.query(clubHeaderSql, [clubId, userId]);
  const upcoming = await db.query(upcomingEventsSql, [clubId]);
  const members = await db.query(membersSql, [clubId]);

  return {
    club: clubHeader.rows[0],
    upcomingEvents: upcoming.rows,
    members: members.rows,
  };
}
