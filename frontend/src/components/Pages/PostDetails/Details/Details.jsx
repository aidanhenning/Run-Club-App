import styles from "@/components/Pages/PostDetails/Details/Details.module.css";

import {
  MdFlag,
  MdOutlineAccessTime,
  MdOutlineLocationOn,
  MdOutlineDirectionsRun,
} from "react-icons/md";

export default function Details({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("en-US", { month: "short" }),
      day: date.toLocaleString("en-US", { day: "2-digit" }),
      weekday: date.toLocaleString("en-US", { weekday: "short" }),
    };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return timePart;
  };

  const { month, day, weekday } = formatDate(post.starts_at);

  const isFuture = new Date(post.starts_at) > new Date();

  return (
    <section className={styles.details}>
      <div>
        {post?.club_logo ? (
          <img
            src={post.club_logo}
            alt={`${post.club_name} logo`}
            className={styles.clubLogo}
          />
        ) : (
          <MdFlag className={styles.placeholder} />
        )}
      </div>

      <div>
        <div className={styles.calendarIcon}>
          <span className={isFuture ? styles.upcomingMonth : styles.pastMonth}>
            {month}
          </span>
          <span className={styles.day}>{day}</span>
          <span className={styles.weekday}>{weekday}</span>
        </div>
      </div>

      <div>
        <h2 className={styles.title}>{post.title}</h2>
        <span>{formatTime(post.starts_at)}</span>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsItem}>
          <span className={styles.label}>Distance</span>
          <span className={styles.value}>{post.distance}mi</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Elev</span>
          <span className={styles.value}>{post.elevation}ft</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Type</span>
          <span className={styles.value}>{post.run_type}</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{post.estimated_time}</span>
        </div>
      </div>

      <div className={styles.additionalDetails}>
        <h3 className={styles.subTitle}>Details</h3>
        <div className={styles.detailRow}>
          <MdOutlineLocationOn className={styles.icon} />
          <address className={styles.address}>{post.address}</address>
        </div>
      </div>
    </section>
  );
}
