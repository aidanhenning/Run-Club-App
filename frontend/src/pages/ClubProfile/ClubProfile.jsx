import styles from "./ClubProfile.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import { MdFlag } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";

export default function ClubProfile() {
  const { API, token, userLoading, user } = useAuth();
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState([]);

  useEffect(() => {
    const fetchClubProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API}/clubs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Could not find this club.");
        const data = await res.json();
        setClub(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch club:", err);
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchClubProfile();
  }, [API, token, id]);

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
    <div className={styles.container}>
      <Header title="Clubs" />

      <div className={styles.clubBanner}></div>

      <main className={styles.content}>
        <section className={styles.clubInfo}>
          <div className={styles.clubLogo}>
            {club?.club?.logo === null ? (
              <MdFlag className={styles.placeholder} />
            ) : (
              club?.club?.logo
            )}
          </div>
          <h2 className={styles.clubName}>{club?.club?.name}</h2>
          <p className={styles.memberCount}>
            <MdGroups2 className={styles.membersIcon} />
            <span>{club?.club?.member_count}</span>
            <span>Members</span>
          </p>
          <p className={styles.description}>{club?.club?.description}</p>
          <button
            onClick={handleMemberToggle}
            className={club?.club?.is_member ? styles.leave : styles.join}
          >
            {club?.club?.is_member ? "Leave Club" : "Join Club"}
          </button>
        </section>
        <section className={styles.upcomingEvents}>
          <h3>Upcoming Events</h3>
        </section>
        <section className={styles.posts}>
          <h3>Posts</h3>
          <p>See more posts...</p>
        </section>
        <section className={styles.clubMembers}>
          <h3>Members</h3>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
