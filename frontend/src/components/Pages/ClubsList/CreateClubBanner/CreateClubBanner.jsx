import styles from "@/components/Pages/ClubsList/CreateClubBanner/CreateClubBanner.module.css";

export default function CreateClubBanner() {
  return (
    <div className={styles.createClubBanner}>
      <p className={styles.createClubText}>Create your own club</p>
      <button className={styles.createClubButton}>Create a Club</button>
    </div>
  );
}
