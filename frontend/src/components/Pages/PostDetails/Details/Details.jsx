import styles from "@/components/Pages/PostDetails/Details/Details.module.css";

import { useNavigate } from "react-router";
import { MdFlag, MdLocationOn } from "react-icons/md";
import { FaCrown } from "react-icons/fa";

export default function Details({ details }) {
  const navigate = useNavigate();

  const formatPostDateDay = (dateString) => {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return datePart;
  };

  const formatPostDateTime = (dateString) => {
    const date = new Date(dateString);

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return timePart;
  };

  return (
    <section className={styles.details}>
      <div>
        <h2 className={styles.title}>{details.title}</h2>
      </div>
      {details?.club_logo ? (
        <img
          src={details.club_logo}
          alt={`${details.club_name} logo`}
          className={styles.clubLogo}
        />
      ) : (
        <MdFlag className={styles.placeholder} />
      )}
      <div className={styles.date}>
        <span className={styles.day}>
          {formatPostDateDay(details.starts_at)}
        </span>
        <span className={styles.time}>
          {formatPostDateTime(details.starts_at)}
        </span>
      </div>
      <div className={styles.stats}>
        <div className={styles.statsItem}>
          <span className={styles.label}>Distance</span>
          <span className={styles.value}>{details.distance}mi</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Elev</span>
          <span className={styles.value}>{details.elevation}ft</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Type</span>
          <span className={styles.value}>{details.run_type}</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{details.estimated_time}</span>
        </div>
      </div>
      <div className={styles.host}>
        <h3 className={styles.hostTitle}>
          <span className={styles.icon}>
            <FaCrown />
          </span>
          <span>Hosted by</span>
        </h3>
        <img
          src={details.owner_profile_picture}
          alt={`${details.owner_first_name} ${details.owner_last_name}'s profile picture`}
          onClick={() => navigate(`/profile/${details.club_owner_id}`)}
          className={styles.profilePicture}
        />
      </div>
      <div>
        <p className={styles.location}>
          <span className={styles.icon}>
            <MdLocationOn />
          </span>
          <span>{details.address}</span>
        </p>
      </div>
      {/* <section>{details.description}</section> */}
    </section>
  );
}
