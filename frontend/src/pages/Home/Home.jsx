import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import SkeletonHome from "../../components/SkeletonHome/SkeletonHome";
import PostCard from "../../components/PostCard/PostCard";
import BottomNav from "../../components/BottomNav/BottomNav";
import { BsFilePost } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function Home() {
  const { token, user, userLoading, API } = useAuth();

  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
        console.log(data);
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
      <header className={styles.header}>
        <button
          className={styles.createButton}
          onClick={() => setIsCreateOpen(!isCreateOpen)}
        >
          +
        </button>
        <h1 className={styles.headerTitle}>Home</h1>
        <Link to="/profile" className={styles.headerProfileLink}>
          {user?.profile_picture_url ? (
            <img
              src={user.profile_picture_url}
              alt="Me"
              className={styles.profileImg}
            />
          ) : (
            <div className={styles.profileInitial}>
              {user?.first_name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </header>

      {isCreateOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/create-post">
            <BsFilePost />
            New Post
          </Link>
          <Link to="/create-club">
            <HiOutlineUserGroup />
            New Club
          </Link>
        </div>
      )}

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
