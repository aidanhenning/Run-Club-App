import React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "./Home.module.css";
import BottomNav from "../../components/BootomNav/BottomNav";

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
    <>
      <header className={styles.homeHeader}>
        <h1 className={styles.homeHeaderText}>Home</h1>
      </header>
      <main className={styles.homeContent}>
        <article className={styles.homePost}>
          <div></div>
        </article>
      </main>
      <BottomNav />
    </>
  );
}
