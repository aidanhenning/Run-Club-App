import styles from "./ClubCard.module.css";
import { Link } from "react-router";
import { MdFlag } from "react-icons/md";

export default function ClubCard({ club }) {
  return (
    <Link to={`/clubs/${club.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.clubLogo}>
          {club.logo === null ? (
            <MdFlag className={styles.placeholder} />
          ) : (
            club.logo
          )}
        </div>
        <div className={styles.clubText}>
          <div className={styles.clubName}>{club.name}</div>
          <div className={styles.clubMemberCount}>
            {club.member_count} members
          </div>
          <div className={styles.cta}>click to see details</div>
        </div>
      </div>
    </Link>
  );
}
