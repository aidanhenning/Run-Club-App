import React from "react";
import styles from "./Home.module.css";
import SkeletonHome from "../../components/SkeletonHome/SkeletonHome";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { token, API } = useAuth();

  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !API) return;

    setLoading(true);

    const fetchFeed = async () => {
      try {
        const response = await fetch(`${API}/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFeed(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchFeed();
  }, [token, API]);

  if (loading) {
    return (
      <>
        <SkeletonHome />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Home</h1>
      </header>

      <main className={styles.content}>
        {feed.length > 0 ? (
          feed.map((post) => (
            <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>
                {post.type_of_run} - {post.distance} miles
              </p>
            </div>
          ))
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
