import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Profile() {
  const { API, token, user, logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Could not find this user.");
        const data = await res.json();
        setProfile(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [API, token, id]);

  const handleFollowToggle = async () => {
    if (isOwnProfile || !profile?.user) return;

    const { is_followed, id } = profile.user;
    const method = is_followed ? "DELETE" : "POST";

    try {
      const res = await fetch(`${API}/followers/${id}`, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProfile((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            is_followed: !is_followed,
            followers_count: is_followed
              ? prev.user.followers_count - 1
              : prev.user.followers_count + 1,
          },
        }));
      }
    } catch (err) {
      console.error("Follow toggle failed:", err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="Profile" />

      <main className={styles.content}>
        <section className={styles.user}>
          <div>
            <img
              src={profile?.user?.profile_picture_url}
              alt="avatar"
              className={styles.avatar}
            />
            <div>
              <h2>
                {profile?.user?.first_name}
                {profile?.user?.last_name}
              </h2>
              <p>{profile?.user?.location}</p>
            </div>
          </div>
          <div>
            <p>{profile?.user?.bio}</p>
          </div>
          <div>
            <span>{profile?.user?.followers_count}</span> Followers
            <span>{profile?.user?.following_count}</span> Following
          </div>
          <div>
            <span>{profile?.user?.total_distance}</span>
            <span>{profile?.user?.total_elevation}</span>
            <span>{profile?.user?.total_time}</span>
          </div>
        </section>
        <section className={styles.posts}></section>
        <section className={styles.clubs}></section>
        {isOwnProfile && <button onClick={handleLogout}>Log Out</button>}
        <div className={styles.profileHeader}>
          {/* Display Stats from your new query */}

          {isOwnProfile ? (
            <button className={styles.editBtn}>Edit Profile</button>
          ) : (
            <button
              onClick={handleFollowToggle}
              className={
                profile?.user?.is_followed ? styles.following : styles.follow
              }
            >
              {profile?.user?.is_followed ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
