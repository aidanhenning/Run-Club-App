import styles from "./SkeletonHome.module.css";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";

export default function SkeletonHome() {
  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonTitle}>
        <div className={styles.skeletonTitleProfileImage}></div>
        <div className={styles.skeletonTitleText}></div>
      </div>

      <div className={styles.skeletonStats}>
        <div className={styles.skeletonStatsItem}></div>
        <div className={styles.skeletonStatsItem}></div>
        <div className={styles.skeletonStatsItem}></div>
        <div className={styles.skeletonStatsItem}></div>
      </div>

      <div className={styles.skeletonPictures}></div>

      <div className={styles.skeletonBibleVerse}></div>

      <div className={styles.skeletonComments}></div>
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
