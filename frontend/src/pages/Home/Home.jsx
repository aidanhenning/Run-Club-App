import React from "react";
import styles from "./Home.module.css";
import BottomNav from "../../components/BootomNav/BottomNav";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { token, API } = useAuth();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${API}/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Feed Data:", data);
        setFeed(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchFeed();
  }, [token, API]);

  if (loading) return <p>Loading your miles...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Home</h1>
      </header>

      <main className={styles.content}>
        {feed.length > 0 ? (
          feed.map((post) => <RunCard key={post.id} run={post} />)
        ) : (
          <div className={styles.emptyState}>
            <p>No runs yet. Join a club to see what's happening!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
