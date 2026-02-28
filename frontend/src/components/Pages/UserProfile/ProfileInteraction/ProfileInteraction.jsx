import styles from "@/components/Pages/UserProfile/ProfileInteraction/ProfileInteraction.module.css";

import { useNavigate } from "react-router";

export default function ProfileInteraction({
  API,
  token,
  setError,
  setLoading,
  profile,
  setProfile,
  isOwnProfile,
}) {
  const navigate = useNavigate();

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
    <section className={styles.profileInteraction}>
      {isOwnProfile ? (
        // TO DO:
        <>
          <button className={styles.editBtn}>Edit Profile</button>
          <button onClick={handleLogout} className={styles.logout}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleFollowToggle}
            className={
              profile?.user?.is_followed ? styles.following : styles.follow
            }
          >
            {profile?.user?.is_followed ? "Following" : "Follow"}
          </button>
          <button className={styles.message}>Message</button>
        </>
      )}
    </section>
  );
}
