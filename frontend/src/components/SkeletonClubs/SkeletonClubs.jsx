import styles from "./SkeletonClubs.module.css";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";

export default function SkeletonClubs() {
  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonClubLogo}></div>
      <div className={styles.skeletonClubText}>
        <div className={styles.skeletonClubName}></div>
        <div className={styles.skeletonClubMemberCount}></div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Header title="Home" />

      <main className={styles.content}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
