import db from "../client.js";

export async function getClubProfile(clubId, userId) {
  // 1. Get the Header Info (Club details + the user's personal membership stats)
  const clubHeaderSql = `
    SELECT 
      id, name, logo, description,
      -- Count all members in this club
      (SELECT COUNT(*)::int FROM club_memberships WHERE club_id = $1) AS member_count,
      -- Check if the current viewer is a member (returns true/false)
      EXISTS (
        SELECT 1 FROM club_memberships 
        WHERE club_id = $1 AND user_id = $2
      ) AS is_member
    FROM clubs
    WHERE id = $1;
  `;

  // 2. Get Upcoming Events (Runs where starts_at is in the future)
  const upcomingEventsSql = `
    SELECT id, title, starts_at, address, run_type
    FROM posts
    WHERE club_id = $1 AND starts_at >= NOW()
    ORDER BY starts_at ASC;
  `;

  // 3. Get Past Events (Runs where starts_at is in the past)
  const pastEventsSql = `
    SELECT id, title, starts_at, address, run_type
    FROM posts
    WHERE club_id = $1 AND starts_at < NOW()
    ORDER BY starts_at DESC;
`;

  // 4. Get Members List
  const membersSql = `
    SELECT u.id, u.first_name, u.last_name, u.profile_picture_url, cm.runs_with_club
    FROM users u
    JOIN club_memberships cm ON u.id = cm.user_id
    WHERE cm.club_id = $1
    ORDER BY cm.runs_with_club DESC;
  `;

  const [clubHeader, upcoming, past, members] = await Promise.all([
    db.query(clubHeaderSql, [clubId, userId]),
    db.query(upcomingEventsSql, [clubId]),
    db.query(pastEventsSql, [clubId]),
    db.query(membersSql, [clubId]),
  ]);

  return {
    club: clubHeader.rows[0],
    upcomingEvents: upcoming.rows,
    pastEvents: past.rows,
    members: members.rows,
  };
}
