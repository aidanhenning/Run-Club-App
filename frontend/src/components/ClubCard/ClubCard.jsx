import styles from "@/components/ClubCard/ClubCard.module.css";

import { Link } from "react-router";
import { MdFlag } from "react-icons/md";

export default function ClubCard({ club }) {
  return (
    <Link to={`/clubs/${club.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {club?.logo ? (
          <img
            src={club.logo}
            alt={`${club.club_name} logo`}
            className={styles.clubLogo}
          />
        ) : (
          <MdFlag className={styles.placeholder} />
        )}
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
