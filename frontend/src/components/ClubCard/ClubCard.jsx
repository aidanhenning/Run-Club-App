import styles from "@/components/ClubCard/ClubCard.module.css";

import { Link } from "react-router";
import { MdFlag, MdGroups } from "react-icons/md";

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
          <div className={styles.memberCount}>
            <MdGroups className={styles.membersIcon} />
            <span>{club.member_count}</span>
            <span>members</span>
          </div>
          <div className={styles.cta}>click to see details</div>
        </div>
      </div>
    </Link>
  );
}
