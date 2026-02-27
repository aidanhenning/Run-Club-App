import styles from "@/pages/Clubs/Clubs.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import SkeletonClubs from "@/components/SkeletonClubs/SkeletonClubs";
import ClubCard from "@/components/ClubCard/ClubCard";

import { useEffect, useState } from "react";

export default function Clubs() {
  const { API, token, userLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (!token || !API) return;

    setLoading(true);

    const fetchClubs = async () => {
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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchClubs();
  }, [token, API]);

  if (loading || userLoading) {
    return (
      <>
        <SkeletonClubs />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Header title="Clubs" />

      <main className={styles.content}>
        {clubs.length > 0 ? (
          clubs.map((club) => <ClubCard key={club.id} club={club} />)
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
