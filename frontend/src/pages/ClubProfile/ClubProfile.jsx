import styles from "./ClubProfile.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import { MdFlag } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdOutlineDirectionsRun, MdOutlineLocationOn } from "react-icons/md";

export default function ClubProfile() {
  const { API, token, userLoading, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState([]);
  const [view, setView] = useState("upcoming");

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("en-US", { month: "short" }),
      day: date.toLocaleString("en-US", { day: "2-digit" }),
      weekday: date.toLocaleString("en-US", { weekday: "short" }),
    };
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
        <section className={styles.eventsSection}>
          <div className={styles.tabContainer}>
            <button
              className={view === "upcoming" ? styles.activeTab : styles.tab}
              onClick={() => setView("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={view === "past" ? styles.activeTab : styles.tab}
              onClick={() => setView("past")}
            >
              Past
            </button>
          </div>
          <div className={styles.eventsContainer}>
            {loading ? (
              <p>Loading events...</p>
            ) : (view === "upcoming" ? club?.upcomingEvents : club?.pastEvents)
                ?.length > 0 ? (
              (view === "upcoming" ? club.upcomingEvents : club.pastEvents).map(
                (event) => {
                  const { month, day, weekday } = formatDate(event.starts_at);
                  return (
                    <div key={event.id} className={styles.eventCard}>
                      <div className={styles.calendarIcon}>
                        <span
                          className={
                            view === "upcoming"
                              ? styles.upcomingMonth
                              : styles.pastMonth
                          }
                        >
                          {month}
                        </span>
                        <span className={styles.day}>{day}</span>
                        <span className={styles.weekday}>{weekday}</span>
                      </div>

                      <div className={styles.eventDetails}>
                        <h4 className={styles.eventTitle}>{event.title}</h4>
                        <div className={styles.detailRow}>
                          <MdOutlineDirectionsRun className={styles.icon} />
                          <span>{event.run_type}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <MdOutlineLocationOn className={styles.icon} />
                          <address className={styles.address}>
                            {event.address}
                          </address>
                        </div>
                      </div>
                    </div>
                  );
                },
              )
            ) : (
              <p className={styles.emptyState}>No {view} events found</p>
            )}
          </div>
        </section>
        <section className={styles.clubMembers}>
          <h3>Members</h3>
          <div className={styles.membersContainer}>
            {loading ? (
              <p>Loading members...</p>
            ) : club?.members?.length > 0 ? (
              club.members.map((member) => (
                <div
                  key={member.id}
                  className={styles.memberCard}
                  onClick={() => navigate(`/profile/${member.id}`)}
                >
                  <img
                    src={member.profile_picture_url}
                    alt={`${member.first_name}'s profile picture`}
                    className={styles.memberAvatar}
                  />
                  <div>
                    <p>
                      {member.first_name} {member.last_name}
                    </p>
                    <p>{member.runs_with_club} Club Runs</p>
                  </div>
                </div>
              ))
            ) : (
              <p>This club has no members</p>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
