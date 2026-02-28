import styles from "@/components/Pages/UserProfile/UserHeader/UserHeader.module.css";

export default function UserHeader({ user }) {
  return (
    <section className={styles.user}>
      <div className={styles.userKeyInfo}>
        <img
          src={user?.icture_url}
          alt={user?.first_name}
          className={styles.avatar}
        />
        <div>
          <h2 className={styles.name}>
            <span>{user?.first_name}</span>
            <span>{user?.last_name}</span>
          </h2>
          <p className={styles.location}>{user?.location}</p>
        </div>
      </div>
      <div className={styles.mainStats}>
        <div className={styles.keyValue}>
          <span className={styles.key}>Activities</span>
          <span className={styles.value}>{user?.club_runs_count}</span>
        </div>
        <div className={styles.keyValue}>
          <span className={styles.key}>Followers</span>
          <span className={styles.value}>{user?.followers_count}</span>
        </div>
        <div className={styles.keyValue}>
          <span className={styles.key}>Following</span>
          <span className={styles.value}>{user?.following_count}</span>
        </div>
      </div>
      <div className={styles.userBio}>
        <p>{user?.bio}</p>
      </div>
    </section>
  );
}
