import styles from "@/components/Pages/ClubProfile/MemberToggle/MemberToggle.module.css";

export default function MemberToggle({ API, token, club, setClub }) {
  const handleMemberToggle = async () => {
    if (!club?.club) return;

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
      <button
        onClick={handleMemberToggle}
        className={club?.club?.is_member ? styles.leave : styles.join}
      >
        {club?.club?.is_member ? "Leave Club" : "Join Club"}
      </button>
    </div>
  );
}
