import styles from "@/components/Pages/ClubsList/SkeletonClubs/SkeletonClubs.module.css";

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
    <>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
