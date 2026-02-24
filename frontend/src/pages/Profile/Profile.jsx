import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";
import SkeletonPicture from "../../components/SkeletonPicture/SkeletonPicture";
import PictureGrid from "../../components/PictureGrid/PictureGrid";
import SkeletonClubs from "../../components/SkeletonClubs/SkeletonClubs";
import ClubCard from "../../components/ClubCard/ClubCard";

export default function Profile() {
  const { API, token, userLoading, user, logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
    setLoading(true);

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="Profile" />

      <main className={styles.content}>
        <section className={styles.user}>
          <div className={styles.userKeyInfo}>
            <img
              src={profile?.user?.profile_picture_url}
              alt="avatar"
              className={styles.avatar}
            />
            <div>
              <h2 className={styles.name}>
                <span>{profile?.user?.first_name}</span>
                <span>{profile?.user?.last_name}</span>
              </h2>
              <p className={styles.location}>{profile?.user?.location}</p>
              <div className={styles.mainStats}>
                <div className={styles.keyValue}>
                  <span>{profile?.user?.club_runs_count}</span>
                  <span>Activities</span>
                </div>
                <div className={styles.keyValue}>
                  <span>{profile?.user?.followers_count}</span>
                  <span>Followers</span>
                </div>
                <div className={styles.keyValue}>
                  <span>{profile?.user?.following_count}</span>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.userBio}>
            <p>{profile?.user?.bio}</p>
          </div>
        </section>
        <section className={styles.profileInteraction}>
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
          {isOwnProfile ? (
            <button onClick={handleLogout} className={styles.logout}>
              Log Out
            </button>
          ) : (
            // TO DO:
            <button className={styles.message}>Message</button>
          )}
        </section>
        <section className={styles.secondaryStats}>
          <h3>Stats</h3>
          <div className={styles.data}>
            <div className={styles.keyValue}>
              <span>{profile?.user?.total_distance}</span>
              <span>Total distance</span>
            </div>
            <div className={styles.keyValue}>
              <span>{profile?.user?.total_elevation}</span>
              <span>Total elevation</span>
            </div>
            <div className={styles.keyValue}>
              <span>{profile?.user?.total_time}</span>
              <span>Total time</span>
            </div>
          </div>
        </section>
        <section className={styles.posts}>
          <h3>Photos</h3>
          {profile?.posts.length > 0 ? (
            profile?.posts.map((picture) => (
              <PictureGrid key={picture.id} picture={picture} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>No pictures uploaded</p>
              {/* add placeholder grey boxes if there are no pictures */}
            </div>
          )}
        </section>
        <section className={styles.clubs}>
          <h3>Clubs</h3>
          {profile?.clubs.length > 0 ? (
            profile?.clubs.map((club) => <ClubCard key={club.id} club={club} />)
          ) : (
            <div className={styles.emptyState}>
              <p>No clubs joined</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
