import styles from "@/components/Pages/ClubProfile/ClubHeader/ClubHeader.module.css";

import { MdFlag } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";

export default function ClubHeader({ club }) {
  return (
    <section className={styles.clubInfo}>
      {club?.logo ? (
        <img
          src={club.logo}
          alt={`${club.name} logo`}
          className={styles.clubLogo}
        />
      ) : (
        <MdFlag className={styles.placeholder} />
      )}
      <h2 className={styles.clubName}>{club?.name}</h2>
      <p className={styles.memberCount}>
        <MdGroups2 className={styles.membersIcon} />
        <span>{club?.member_count}</span>
        <span>Members</span>
      </p>
      <p className={styles.description}>{club?.description}</p>
    </section>
  );
}
