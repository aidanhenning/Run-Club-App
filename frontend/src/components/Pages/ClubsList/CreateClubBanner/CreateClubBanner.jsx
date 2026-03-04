import styles from "@/components/Pages/ClubsList/CreateClubBanner/CreateClubBanner.module.css";

import { Link } from "react-router";

export default function CreateClubBanner() {
  return (
    <div className={styles.createClubBanner}>
      <p className={styles.createClubText}>Create your own club</p>
      <Link to="/create-club" className={styles.createClubButton}>
        Create a Club
      </Link>
    </div>
  );
}
