import styles from "@/components/Pages/ClubProfile/ClubInteraction/ClubInteraction.module.css";

import { useNavigate } from "react-router";

export default function ClubInteraction({ API, user, token, club, setClub }) {
  const isOwnClub = club?.club?.owner === user?.id;
  const navigate = useNavigate();

  const handleMemberToggle = async () => {
    if (!club?.club) return;

    console.log(club);

    const { is_member, id } = club.club;
    const method = is_member ? "DELETE" : "POST";

    try {
      const res = await fetch(`${API}/clubmemberships/${id}`, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setClub((prev) => ({
          ...prev,
          club: {
            ...prev.club,
            is_member: !is_member,
            member_count: is_member
              ? prev.club.member_count - 1
              : prev.club.member_count + 1,
          },
        }));
      } else {
        const errorData = await res.json();
        console.error("Membership toggle error:", errorData.error);
      }
    } catch (err) {
      console.error("Failed to toggle club membership:", err);
    }
  };

  return (
    <div className={styles.clubAction}>
      {isOwnClub && (
        <button
          onClick={() => navigate(`/clubs/${club.club.id}/edit`)}
          className={styles.editBtn}
        >
          Edit Club
        </button>
      )}
      <button
        onClick={handleMemberToggle}
        className={club?.club?.is_member ? styles.leave : styles.join}
      >
        {club?.club?.is_member ? "Leave Club" : "Join Club"}
      </button>
    </div>
  );
}
