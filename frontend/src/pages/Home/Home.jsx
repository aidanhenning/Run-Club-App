import styles from "@/pages/Home/Home.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import SkeletonHome from "@/components/SkeletonHome/SkeletonHome";
import PostCard from "@/components/PostCard/PostCard";

import { useEffect, useState } from "react";

export default function Home() {
  const { API, token, userLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);

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

  if (loading || userLoading) {
    return (
      <>
        <SkeletonHome />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Header title="Home" />

      <main className={styles.content}>
        {feed.length > 0 ? (
          feed.map((post) => <PostCard key={post.id} post={post} />)
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
