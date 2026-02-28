import styles from "@/pages/ClubsList/ClubsList.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import CreateClubBanner from "@/components/Pages/ClubsList/CreateClubBanner/CreateClubBanner";
import SkeletonClubs from "@/components/Pages/ClubsList/SkeletonClubs/SkeletonClubs";
import ClubCard from "@/components/Pages/ClubsList/ClubCard/ClubCard";

import { useEffect, useState } from "react";

export default function ClubsList() {
  const { API, token, userLoading } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (!token || !API) return;

    const fetchClubs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API}/clubmemberships`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setClubs(data);
      } catch (err) {
        console.error("Failed to fetch clubs:", err);
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchClubs();
  }, [token, API]);

  return (
    <div className={styles.container}>
      <Header title="Clubs" />

      <main className={styles.content}>
        <CreateClubBanner />
        {loading || userLoading ? (
          <SkeletonClubs />
        ) : clubs.length > 0 ? (
          <div className={styles.clubsGrid}>
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Join clubs and see them all here!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
