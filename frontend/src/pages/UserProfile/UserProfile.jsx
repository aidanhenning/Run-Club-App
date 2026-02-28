import styles from "@/pages/UserProfile/UserProfile.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import UserHeader from "../../components/Pages/UserProfile/UserHeader/UserHeader";
import ProfileInteraction from "../../components/Pages/UserProfile/ProfileInteraction/ProfileInteraction";
import SkeletonPictures from "@/components/Pages/UserProfile/SkeletonPictures/SkeletonPictures";
import PictureCard from "@/components/Pages/UserProfile/PictureCard/PictureCard";

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ClubsList from "../../components/Pages/UserProfile/ClubsList/ClubsList";

export default function UserProfile() {
  const { API, token, userLoading, user, logout } = useAuth();
  const { id } = useParams();
  const isOwnProfile = user?.id === id;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token || !API) return;

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

  return (
    <div className={styles.container}>
      <Header title="Profile" />

      <main className={styles.content}>
        <UserHeader user={profile?.user} />
        <ProfileInteraction
          API={API}
          token={token}
          setError={setError}
          setLoading={setLoading}
          profile={profile}
          setProfile={setProfile}
          isOwnProfile={isOwnProfile}
        />

        <section className={styles.pictures}>
          <h3 className={styles.picturesTitle}>Photos</h3>
          {loading ? (
            <SkeletonPictures />
          ) : profile?.posts.length > 0 ? (
            <div className={styles.picturesContainer}>
              {profile?.posts.map((picture) => (
                <PictureCard key={picture.id} picture={picture} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No pictures uploaded</p>
            </div>
          )}
        </section>

        <ClubsList clubs={profile?.clubs} />
      </main>

      <BottomNav />
    </div>
  );
}
