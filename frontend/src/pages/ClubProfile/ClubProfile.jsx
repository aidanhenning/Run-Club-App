import styles from "@/pages/ClubProfile/ClubProfile.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import ClubHeader from "@/components/Pages/ClubProfile/ClubHeader/ClubHeader";
import EventList from "@/components/Pages/ClubProfile/EventList/EventList";
import MemberList from "@/components/Pages/ClubProfile/MemberList/MemberList";
import MemberToggle from "@/components/Pages/ClubProfile/MemberToggle/MemberToggle";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ClubProfile() {
  const { API, token, userLoading, user } = useAuth();
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState([]);

  useEffect(() => {
    if (!token || !API) return;

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

  return (
    <div className={styles.container}>
      <Header title="Clubs" />

      <div className={styles.clubBanner}></div>

      <main className={styles.content}>
        <ClubHeader club={club.club} />
        <EventList club={club} loading={loading} />
        <MemberList club={club} loading={loading} />
        <MemberToggle API={API} token={token} club={club} setClub={setClub} />
      </main>

      <BottomNav />
    </div>
  );
}
