import styles from "@/components/Pages/Home/SkeletonHome/SkeletonHome.module.css";

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
    <>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
